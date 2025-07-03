import { useEffect, useState } from "react";
import './Tasks.css';
import { FaTrash } from "react-icons/fa";
import EditTaskModal from "./EditTaskModal";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/v1/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      const sorted = data.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      setTasks(sorted);
    } else {
      alert("Failed to retrieve tasks");
    }
  };

  const handleToggleCompleted = async (taskId) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/api/v1/tasks/${taskId}/toggle`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

      if (response.ok) {
        setRefresh(prev => !prev);

      } else {
        alert('Failed to toggle completion.');
    }
};

const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  await fetch(`http://localhost:8080/api/v1/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  setTasks((prev) => prev.filter((task) => task.id !== taskId));
};

const confirmDelete = async () => {
  if (taskToDelete) {
    await deleteTask(taskToDelete);
    setShowModal(false);
    setTaskToDelete(null);
  }
};

const cancelDelete = () => {
  setShowModal(false);
  setTaskToDelete(null);
};

const handleEditTask = (task) => {
  setEditTask(task);
};

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const now = new Date();

  return (
    <div className="taskContainer">
      <h2 className="taskHeader">My Tasks</h2>
      <div className="allTasks">
        {tasks.map((task) => {
        const due = new Date(task.dueDate);
        const isOverdue = !task.completed && due < now; // overdue only if not completed

        return (
          <div
            className={`task-item ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}
            key={task.id}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
            />
            <div className="task-text">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <small>Due: {due.toLocaleString()}</small>
            </div>
            <div className="task-actions">
              <button
                className="edit-button"
                onClick={() => handleEditTask(task)}
                title="Edit task"
              >
                ✏️
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  setTaskToDelete(task.id);
                  setShowModal(true);
                }}
                title="Delete task"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
      </div>
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onTaskUpdated={() => {
            setRefresh((prev) => !prev);
            setEditTask(null);
          }}
        />
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button className="modal-yes" onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
