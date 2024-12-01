import React, { useState, useEffect } from "react";

function ToDoList() {
  // Load tasks from local storage on initial render, or use an empty array if no tasks exist
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTasks] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(event) {
    setNewTasks(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTasks("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function startEditTask(index) {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  }

  function saveEditTask() {
    if (editingTask.trim() === "") return;
    
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex ? editingTask : task
    );
    
    setTasks(updatedTasks);
    cancelEdit();
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditingTask("");
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task ..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                />
                <button className="save-button" onClick={saveEditTask}>
                  Save
                </button>
               
              </>
            ) : (
              <>
                <span className="text">{task}</span>
                <button
                  className="edit-button"
                  onClick={() => startEditTask(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;