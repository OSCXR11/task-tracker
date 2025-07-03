import { useState } from "react";
import './Tasks.css';

function TaskForm({ onTaskCreated, onClose  }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newTask = await response.json();
      onTaskCreated(newTask);
      setFormData({ title: "", description: "", dueDate: "" });
    } else {
      alert("Failed to create task");
    }
  };

    return (
      <div className="task-form-container">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>Create New Task!</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  
}

export default TaskForm;
