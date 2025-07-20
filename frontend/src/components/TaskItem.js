import React from 'react';

const TaskItem = ({ task, onSelectTask, isActive }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div 
            className={`task-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTask(task)}
        >
            <h3>{task.title}</h3>
            <p>{task.description || 'No description'}</p>
            <div className="task-item-footer">
                <span>{formatDate(task.createdAt)}</span>
                <span className="status-badge">{task.category || 'General'}</span>
            </div>
        </div>
    );
};

export default TaskItem;