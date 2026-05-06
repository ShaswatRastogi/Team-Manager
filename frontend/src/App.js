import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("Member");
  const [error, setError] = useState("");

useEffect(() => {
  const savedLogin =
    localStorage.getItem("isLoggedIn");

  const savedRole =
    localStorage.getItem("role");

  if (savedLogin === "true") {
    setIsLoggedIn(true);
  }

  if (savedRole) {
    setRole(savedRole);
  }

  fetchProjects();
  fetchTasks();
}, []);
const fetchProjects = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://127.0.0.1:5000" : "https://team-manager-production-5735.up.railway.app");
    const response = await fetch(`${API_URL}/get-projects`);

    const data = await response.json();

    if (Array.isArray(data)) {
      setProjects(data);
    } else {
      console.log("Failed to fetch projects:", data);
      setProjects([]);
    }
  } catch (error) {
    console.log("Error fetching projects");
  }
};
const fetchTasks = async () => {
  try {
    const email =
      localStorage.getItem("email");
    const role =
      localStorage.getItem("role");

    if (!email) {
      console.log("No email found");
      return;
    }

    console.log("EMAIL SENT:", email, "ROLE:", role);

    const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://127.0.0.1:5000" : "https://team-manager-production-5735.up.railway.app");
    const response = await fetch(
      `${API_URL}/get-tasks?email=${email}&role=${role}`
    );

    const data = await response.json();

    console.log("TASKS RECEIVED:", data);

    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      console.log("Failed to fetch tasks:", data);
      setTasks([]);
    }

  } catch (error) {
    console.log("Error fetching tasks");
  }
};
const handleAuth = async (type) => {
  if (
    name === "" ||
    email === "" ||
    password === ""
  ) {
    setError("Please fill all details");
    return;
  }

  try {
    const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://127.0.0.1:5000" : "https://team-manager-production-5735.up.railway.app");
    const response = await fetch(
      `${API_URL}/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      if (type === "login") {
        setIsLoggedIn(true);

        const userRole = data.role || role;
        setRole(userRole);

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "role",
          userRole
        );

        localStorage.setItem(
          "email",
          email
        );

        fetchProjects();
        fetchTasks();

        navigate("/dashboard");
      }

    } else {
      setError(data.message);
    }

  } catch (error) {
    setError("Server error");
  }
};
const handleCreateProject = async () => {
  if (
    projectName === "" ||
    projectDescription === ""
  ) {
    alert("Please fill project details");
    return;
  }

  try {
    const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://127.0.0.1:5000" : "https://team-manager-production-5735.up.railway.app");
    const response = await fetch(
      `${API_URL}/create-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      setProjects([
        ...projects,
        {
          name: projectName,
          description: projectDescription,
        },
      ]);

      setProjectName("");
      setProjectDescription("");
    }
  } catch (error) {
    alert("Server Error");
  }
};
const handleCreateTask = async () => {
  if (
    taskName === "" ||
    assignedTo === ""
  ) {
    alert("Please fill task details");
    return;
  }

  try {
    const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://127.0.0.1:5000" : "https://team-manager-production-5735.up.railway.app");
    const response = await fetch(
      `${API_URL}/create-task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskName,
          assignedTo,
          taskStatus,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchTasks();

      setTaskName("");
      setAssignedTo("");
      setTaskStatus("Pending");
    }
  } catch (error) {
    alert("Server Error");
  }
};
const handleDeleteTask = async (id) => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || (window.location.hostname === "localhost" ? "http://127.0.0.1:5000" : "https://team-manager-production-5735.up.railway.app");
    const response = await fetch(
      `${API_URL}/delete-task/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      const updatedTasks = tasks.filter(
        (task) => task.id !== id
      );

      setTasks(updatedTasks);
    }
  } catch (error) {
    alert("Server Error");
  }
};
const handleLogout = () => {
  setIsLoggedIn(false);

  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("role");
  localStorage.removeItem("email");

  navigate("/login");
};
  return (
<Routes>

  <Route
    path="/"
    element={<Navigate to="/login" />}
  />

  <Route
    path="/login"
    element={
      <Login
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        error={error}
        handleAuth={handleAuth}
      />
    }
  />

  <Route
  path="/dashboard"
  element={
    isLoggedIn ? (
      <Dashboard
        role={role}

        projectName={projectName}
        setProjectName={setProjectName}
        projectDescription={projectDescription}
        setProjectDescription={setProjectDescription}
        projects={projects}
        handleCreateProject={handleCreateProject}

        taskName={taskName}
        setTaskName={setTaskName}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        taskStatus={taskStatus}
        setTaskStatus={setTaskStatus}
        tasks={tasks}
        setTasks={setTasks}
        handleCreateTask={handleCreateTask}
        handleLogout={handleLogout}
        handleDeleteTask={handleDeleteTask}
      />
    ) : (
      <Navigate to="/login" />
    )
  }
/>

  <Route
    path="*"
    element={<Navigate to="/login" />}
  />

</Routes>
  );
}

export default App;