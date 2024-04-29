// EditProfile.js
import React, { useState } from 'react';


export default function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected file
    const file = event.target.files[0];
    // Set the selected file to state
    setResumeFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if a file is selected
    if (!resumeFile) {
      alert("Please select a file.");
      return;
    }
    // Create form data
    const formData = new FormData();
    formData.append("pdf", resumeFile);
    formData.append("user", JSON.stringify(user));

    try {
      // Get the current URL of the website
      const currentURL = window.location.href;

      // Extract the hostname from the URL
      const hostname = new URL(currentURL).hostname;
      // Send the form data to the backend route
      const response = await fetch(`http://${hostname}:5002/upload-resume`, {
        method: "POST",
        body: formData,
      });
      // Check if the response is successful
      if (response.ok) {
        alert("Resume uploaded successfully.");
        window.location.reload();
        // Redirect or update UI as needed
      } else {
        alert("Failed to upload resume.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("An error occurred while uploading resume.");
    }
  };
  return (
    <div className="mt-40 flex justify-center items-center h-screen">
      {" "}
      {/* Added mt-20 to create space below NavBar */}
      <div className="w-full max-w-3xl bg-white rounded-md shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">
                {user.firstName[0] + user.lastName[0]}
              </span>
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold text-black">
                {user.firstName + " " + user.lastName}
              </h1>
            </div>
          </div>
          <button className="ml-auto bg-white text-black hover:bg-gray-100 py-2 px-4 rounded-md focus:outline-none">
            <FileEditIcon className="w-5 h-5" />
            <span className="sr-only">Edit</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-black font-bold">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-black font-bold">
                    Company
                  </label>
                  <input
                    id="company"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="Enter your company"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="education" className="text-black font-bold">
                    Education
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                    id="education"
                    placeholder="Enter your education"
                  ></textarea>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="resume" className="text-black font-bold">
                    Resume
                  </label>
                  <div className="grid w-full items-center gap-4">
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf" // Accept only PDF files
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact" className="text-black font-bold">
                    Contact
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                    id="contact"
                    placeholder="Enter your contact information"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <button
              type="submit"
              className="ml-auto bg-black text-white hover:bg-gray-800 py-2 px-4 rounded-md focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FileEditIcon(props) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  )
}
