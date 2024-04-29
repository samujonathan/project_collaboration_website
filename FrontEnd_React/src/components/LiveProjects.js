import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ProjectCard({ id, title, description }) {
  return (
    <div className="flex-shrink-0 max-w-md bg-white rounded-lg overflow-hidden shadow-md mx-2 mb-4">
      <div className="p-4">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Category: {id}
        </div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
          {title}
        </h2>
        <p className="mt-2 text-gray-500" style={{ textAlign: "justify" }}>
          {description}
        </p>
      </div>
    </div>
  );
}


export default function LiveProject() {
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null); // Add error state to handle fetch errors
  const user = JSON.parse(localStorage.getItem("user"));
  const currentURL = window.location.href;
  const hostname = new URL(currentURL).hostname;

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://${hostname}:5002/recommend/${user.id}`
      );
      setRecommendedProjects(response.data.recommendations);
      setIsFetched(true);
    } catch (error) {
      setError(error); // Set error state if there's an error
      setIsFetched(true); // Still set isFetched to true to exit loading state
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">Recommended Projects</h1>
        {/* Conditionally render loading screen */}
        {!isFetched && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Loading...</p>
          </div>
        )}

        {/* Conditionally render error message */}
        {error && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-red-600">
              Error fetching recommendations. Please try again later.
            </p>
          </div>
        )}

        {/* Conditionally render recommended projects */}
        {isFetched && !error && (
          <div className="flex flex-wrap justify-center">
            {recommendedProjects.map((project, index) => (
              <ProjectCard
                key={index}
                id={project.Category}
                title={project.Title}
                description={project.Description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

