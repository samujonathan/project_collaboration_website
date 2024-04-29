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
  
  function ProjectCard({ projectName, startDate, deadline, description, progress, teamMembers, tasks }) {
    return (
      <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Project</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{projectName}</h2>
          <p className="mt-2 text-gray-500">{description}</p>
          <div className="mt-4">
            <span className="text-gray-500">Start Date: {startDate}</span><br />
            <span className="text-gray-500">Deadline: {deadline}</span>
          </div>
          <div className="mt-4">
            <span className="text-gray-500">Progress:</span>
            <div className="w-full h-2 bg-gray-200 mt-1 rounded-lg overflow-hidden">
              <div className="w-3/4 h-full bg-green-500"></div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-500">Team Members:</span>
            {teamMembers.map((member, index) => (
              <img key={index} className="h-8 w-8 rounded-full border" src="/placeholder.png" alt={`Team member ${index + 1}`} />
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks</h3>
            <div className="mt-2">
              <ul className="divide-y divide-gray-200">
                {tasks.map((task, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div className="flex gap-2">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" id={`task${index}`} />
                      <label htmlFor={`task${index}`} className="block text-sm text-gray-900">{task}</label>
                    </div>
                    <span className="text-green-500">
                      <CheckCircleIcon className="w-4 h-4" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default function Component() {
    return (
      <div className="flex flex-col items-center justify-center gap-8">
        <ProjectCard
          projectName="Project X"
          startDate="2023-01-20"
          deadline="2023-02-20"
          description="A revolutionary new product that will change the way you work."
          progress="75%"
          teamMembers={[1, 2, 3]} // Placeholder
          tasks={["Design landing page", "Implement login form", "Write documentation"]}
        />
        <ProjectCard
          projectName="Project Y"
          startDate="2023-03-15"
          deadline="2023-04-15"
          description="An artistic masterpiece that pushes the boundaries of creativity."
          progress="50%"
          teamMembers={[1, 2, 3]} // Placeholder
          tasks={["Create wireframes", "Develop backend functionality", "Perform user testing"]}
        />
      </div>
    );
  }
  