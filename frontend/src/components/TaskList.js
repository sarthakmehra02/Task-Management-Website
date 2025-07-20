import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onSelectTask, activeTaskId, onAddTask }) => {
  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>All Notes</h2>
        <p>{tasks.length} Notes</p>
      </div>
      <div className="task-list-controls">
        <button onClick={onAddTask}>+ New Task</button>
      </div>
      <div className="tasks">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onSelectTask={onSelectTask}
            isActive={task._id === activeTaskId}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;