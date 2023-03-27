import React, { useState } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const sortTasks = (property) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
    setTasks(sortedTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <label htmlFor="new-task">Add task:</label>
      <input
        type="text"
        id="new-task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <br />
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={(e) => sortTasks(e.target.value)}>
        <option value="id">Order added</option>
        <option value="task">Task name</option>
        <option value="completed">Completion status</option>
      </select>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.task}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
