import { useState, useEffect } from "react";
import "./Tasks.css";

function EditTaskModal({ task, onClose, onTaskUpdated }) {
    const API_BASE = "https://task-tracker-backend-dvvx.onrender.com/";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.slice(0, 16), // for datetime-local input
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch(API_BASE + `api/v1/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      onTaskUpdated();
      onClose();
    } else {
      alert("Failed to update task");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="task-form-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;