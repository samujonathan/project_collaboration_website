from django.shortcuts import render
from django.http import JsonResponse
from .models import Users, Projects
from .recommendation_script import recommend_projects

def get_recommendations(request, user_id):
    if request.method == 'GET':
        try:
            user = Users.objects.get(user_id=user_id)
            user_resume_path = user.resume_path
            recommendations_df = recommend_projects(user_resume_path, num_recommendations=5)
            #recommendations = recommendations_df.to_dict(orient='records')
            return JsonResponse({'recommendations': recommendations_df})
        except Users.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Unsupported method'}, status=405)
