import pandas as pd
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
import PyPDF2
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import spacy
import psycopg2
import os
from multiprocessing import Pool
import random
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.stem import WordNetLemmatizer

random.seed(42)
np.random.seed(42)

nlp = spacy.load("en_core_web_sm")
skill_pattern_path = "/home/jonathan/study/projects/project_collab_recommendation/recommendation_app/jz_skill_patterns.jsonl"

ruler = nlp.add_pipe("entity_ruler")
ruler.from_disk(skill_pattern_path)

# Download necessary resources for NLTK
nltk.download(['stopwords', 'wordnet'])

# Preprocess resume function
def preprocess_resume(text):
    cleaned_text = re.sub('(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?"', " ", text)
    cleaned_text = cleaned_text.lower()
    tokens = nltk.word_tokenize(cleaned_text)
    stop_words = set(stopwords.words("english"))
    filtered_tokens = [word for word in tokens if word not in stop_words]
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(word) for word in filtered_tokens]
    preprocessed_text = " ".join(lemmatized_tokens)
    return preprocessed_text

# Function to extract text from a resume file
def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    return text

def get_skills(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            subset.append(ent.text)
    myset.append(subset)
    return subset

def train_doc2vec_model(documents):
    tagged_documents = [TaggedDocument(doc.split(), [i]) for i, doc in enumerate(documents)]
    model = Doc2Vec(vector_size=200, min_count=1, epochs=32, workers=1,window=5)
    model.random.seed(42)
    model.build_vocab(tagged_documents)
    model.train(tagged_documents, total_examples=model.corpus_count, epochs=model.epochs)
    return model

def fetch_problem_statements_from_database():
    conn = psycopg2.connect(
        dbname="project_collab",
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        host="localhost"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT title, description, category FROM projects")
    problem_statements = cursor.fetchall()
    cursor.close()
    conn.close()
    return problem_statements


problem_statements = fetch_problem_statements_from_database()
preprocessed_statements = [f"{title} {description}" for title, description, category in problem_statements]

doc2vec_model = train_doc2vec_model(preprocessed_statements)

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(preprocessed_statements)

def recommend_projects(user_resume_path, num_recommendations=1):
    # Load user resume text and preprocess
    user_resume_text = extract_text_from_pdf(user_resume_path)
    preprocessed_resume = preprocess_resume(user_resume_text)

    # TF-IDF vectorization for user resume
    user_resume_tfidf = tfidf_vectorizer.transform([preprocessed_resume])

    # Calculate cosine similarity between user resume and project statements
    similarities = []

    user_skills = set(get_skills(preprocessed_resume))
    user_resume_vector = doc2vec_model.infer_vector(preprocessed_resume.split())

    for project_document in preprocessed_statements:
        similarity = calculate_similarity(user_resume_vector, user_skills, project_document)
        similarities.append(similarity)

    # Get indices of top recommendation
    top_recommendation_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:num_recommendations]

    # Retrieve recommended projects
    recommendations = []
    for index in top_recommendation_indices:
        recommendation = {
            'Title': problem_statements[index][0],
            'Description': problem_statements[index][1],
            'Category': problem_statements[index][2],
            'Similarity': f'{similarities[index]}'
        }
        recommendations.append(recommendation)
    return recommendations


def calculate_similarity(user_resume_vector, user_skills, project_document):
    project_vector = doc2vec_model.infer_vector(project_document.split())
    document_similarity = cosine_similarity([user_resume_vector], [project_vector])[0][0]
    project_skills = set(get_skills(project_document))
    common_skills = user_skills.intersection(project_skills)
    if len(user_skills) == 0 or len(project_skills) == 0:
        skill_similarity = 0
    else:
        skill_similarity = len(common_skills) / (len(user_skills) + len(project_skills))
    similarity = max(skill_similarity, document_similarity)
    return similarity


""" 
# Import necessary libraries
import pandas as pd
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
import PyPDF2
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import spacy

# Load English language model for spaCy
nlp = spacy.load('en_core_web_sm')

# Download necessary resources for NLTK
nltk.download(['stopwords', 'wordnet'])

# Preprocess resume function
def preprocess_resume(text):
    # Step 1: Text cleaning
    cleaned_text = re.sub('(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?"', " ", text)
    cleaned_text = cleaned_text.lower()
    
    # Step 2: Tokenization and removing stopwords
    tokens = nltk.word_tokenize(cleaned_text)
    stop_words = set(stopwords.words("english"))
    filtered_tokens = [word for word in tokens if word not in stop_words]
    
    # Step 3: Lemmatization
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(word) for word in filtered_tokens]
    
    # Step 4: Joining tokens back into a string
    preprocessed_text = " ".join(lemmatized_tokens)
    
    return preprocessed_text

# Function to extract text from a resume file
def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    return text


def get_skills(text):
    doc = nlp(text)
    myset = []
    subset = []
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            subset.append(ent.text)
    myset.append(subset)
    return subset

# Train doc2vec model function
def train_doc2vec_model(documents):
    tagged_documents = [TaggedDocument(doc.split(), [i]) for i, doc in enumerate(documents)]
    model = Doc2Vec(vector_size=100, min_count=1, epochs=31)
    model.build_vocab(tagged_documents)
    model.train(tagged_documents, total_examples=model.corpus_count, epochs=model.epochs)
    return model

# Recommendation function
# Recommendation function
# Recommendation function
# Recommendation function
# Recommendation function
def recommend_projects(problem_statements, user_resume_path, num_recommendations=1):
    # Load user resume text and preprocess
    user_resume_text = extract_text_from_pdf(user_resume_path)
    preprocessed_resume = preprocess_resume(user_resume_text)
    
    # Extract skills from user resume
    user_skills = set(get_skills(user_resume_text))
    
    # Create DataFrame for ongoing projects
    ongoing_projects_df = problem_statements
    
    # Train doc2vec model on project titles and descriptions
    project_documents = []
    for title, description in zip(ongoing_projects_df['Title'], ongoing_projects_df['Description']):
        if pd.isnull(description):
            project_documents.append(title)
        else:
            project_documents.append(title + " " + description)
    model = train_doc2vec_model(project_documents)

    # Infer vector for user resume
    user_resume_vector = model.infer_vector(preprocessed_resume.split())

    # Calculate skill similarity and document similarity for each project
    similarities = []
    for project_document in project_documents:
        project_vector = model.infer_vector(project_document.split())
        
        # Calculate cosine similarity between user's resume and project description
        document_similarity = cosine_similarity([user_resume_vector], [project_vector])[0][0]
        
        # Calculate skill similarity
        project_skills = set(get_skills(project_document))
        common_skills = user_skills.intersection(project_skills)
        
        # Handle division by zero error
        if len(user_skills) == 0 or len(project_skills) == 0:
            skill_similarity = 0
        else:
            skill_similarity = len(common_skills) / (len(user_skills) + len(project_skills))
        
        # Prioritize based on whichever similarity score is higher
        similarity = max(skill_similarity, document_similarity)
        similarities.append(similarity)

    # Get indices of top recommended projects
    top_recommendation_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)[:num_recommendations]
    
    # Prepare recommendations
    recommendations = []
    for index in top_recommendation_indices:
        recommendation = {
            'Title': ongoing_projects_df.iloc[index]['Title'],
            'Category': ongoing_projects_df.iloc[index]['Category'],
            'SimilarityScore': similarities[index]
        }
        recommendations.append(recommendation)

    return pd.DataFrame(recommendations)


# Load the problem statements DataFrame from the Excel file
df = pd.read_excel("./problemStatements.xlsx")

# Extract the "Title" and "Category" columns
problem_statements = df[["Title", "Category","Description"]]

# Example user resume path
user_resume_path = "./ADARSH_RESUME_FINAL.pdf"

# Get recommendations based on user resume
recommendations_df = recommend_projects(problem_statements, user_resume_path, num_recommendations=3)

print(recommendations_df)
 """