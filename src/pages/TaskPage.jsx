import TaskForm from "../components/Task/TaskForm";
import TaskList from "../components/Task/TaskList";

import { useState } from "react";

function TaskPage() {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleTaskCreated = () => {
    setRefresh((prev) => !prev);
    setShowForm(false);
  };

  return (
    <div className="hero">
    <div className="dashboard-header">
      <h1 className="dashboard">Dashboard</h1>
      
      <div className="right-controls">
        <h4 className="createTask" 
        onClick={() => setShowForm((prev) => !prev)}
        >
          New Task
        </h4>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>

    {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <TaskForm
              onTaskCreated={handleTaskCreated}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

    <TaskList key={refresh} />
  </div>
  );
}

export default TaskPage;
