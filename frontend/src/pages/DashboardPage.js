import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TaskEditor from '../components/TaskEditor';
import Spinner from '../components/Spinner';
import * as api from '../services/api';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSelectTask = (task) => {
    setActiveTask(task);
  };

  const handleSaveTask = async (taskToSave) => {
    try {
      const { data: savedTask } = await api.updateTask(taskToSave._id, taskToSave);
      setTasks(tasks.map((t) => (t._id === savedTask._id ? savedTask : t)));
      setActiveTask(savedTask);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleAddTask = async () => {
    const newTaskData = { title: "New Task", description: "" };
    try {
        const { data: newTask } = await api.createTask(newTaskData);
        setTasks([newTask, ...tasks]);
        setActiveTask(newTask);
    } catch (error) {
        console.error('Failed to create task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
      try {
        await api.deleteTask(taskId);
        const updatedTasks = tasks.filter(t => t._id !== taskId);
        setTasks(updatedTasks);
        setActiveTask(updatedTasks.length > 0 ? updatedTasks[0] : null);
      } catch (error) {
          console.error("Failed to delete task:", error);
      }
  }

  return (
    <div className="app-container">
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <main className="dashboard-container">
          <TaskList
            tasks={tasks}
            onSelectTask={handleSelectTask}
            activeTaskId={activeTask?._id}
            onAddTask={handleAddTask}
          />
          <TaskEditor 
            task={activeTask} 
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
           />
        </main>
      )}
    </div>
  );
};

export default DashboardPage;