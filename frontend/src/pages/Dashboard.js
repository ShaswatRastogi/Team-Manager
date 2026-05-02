import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";

function Dashboard({
  role,
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  projects,
  handleCreateProject,
  taskName,
  setTaskName,
  assignedTo,
  setAssignedTo,
  taskStatus,
  setTaskStatus,
  tasks,
  setTasks,
  handleCreateTask,
  handleDeleteTask,
  handleLogout
}) {
  return (
    <div className="app">

      <Sidebar />
      <div id="dashboard" className="main">
        <div className="logout">
          <h1>Welcome, {role}</h1>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
        <DashboardCards tasks={tasks} />
        {role === "Admin" && (
          <div
            id="projects"
            className="table-section"
          >
            <h2>Create New Project</h2>

            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) =>
                setProjectDescription(e.target.value)
              }
            />

            <button onClick={handleCreateProject}>
              Create Project
            </button>

            <h3>Project List</h3>

            {projects.map((project, index) => (
              <div key={index}>
                <p>
                  <strong>{project.name}</strong> —{" "}
                  {project.description}
                </p>

              </div>
            ))}
          </div>
        )}
        {role === "Admin" && (
          <div
            id="tasks"
            className="table-section"
          >
            <h2>Create New Task</h2>

            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) =>
                setTaskName(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Assigned User Email"
              value={assignedTo}
              onChange={(e) =>
                setAssignedTo(e.target.value)
              }
            />

            <select
              value={taskStatus}
              onChange={(e) =>
                setTaskStatus(e.target.value)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <button onClick={handleCreateTask}>
              Create Task
            </button>
          </div>
        )}

        <div className="table-section">
          <h2>Task List</h2>

          {tasks.map((task, index) => (
            <div key={index}>
              <p>
                <strong>{task.task}</strong> —{" "}
                {task.member}
              </p>

              {role === "Admin" && (
                <button onClick={() =>
                  handleDeleteTask(task.id)
                }>Delete</button>
              )}

              <select
                value={task.status}
                onChange={(e) => {
                  const updatedTasks = [...tasks];
                  updatedTasks[index].status =
                    e.target.value;
                  setTasks(updatedTasks);
                }}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;