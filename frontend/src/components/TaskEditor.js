import React, { useState, useEffect } from 'react';

const TaskEditor = ({ task, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  useEffect(() => {
    setEditedTask(task);
    setIsEditing(false); 
  }, [task]);

  if (!task) {
    return (
        <div className="task-editor-container task-editor-placeholder">
            <div>
                <h2>Select a task to view details</h2>
                <p>or create a new one!</p>
            </div>
        </div>
    );
  }

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
      if(window.confirm("Are you sure you want to delete this task?")) {
        onDelete(task._id);
      }
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedTask(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="task-editor-container">
      <div className="task-editor-header">
        {isEditing ? (
            <input 
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                autoFocus
            />
        ) : (
            <h2>{task.title}</h2>
        )}
        
        <div className="editor-buttons">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="task-editor-content">
        <textarea
            name="description"
            value={isEditing ? editedTask.description : task.description}
            onChange={handleChange}
            placeholder="Add a description..."
            disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default TaskEditor;