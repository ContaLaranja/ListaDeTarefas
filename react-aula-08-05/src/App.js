import logo from './logo.png';
import React, { useState } from 'react';
import './App.css';


function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const backgroundImage = require('./fundo.jpg');


  const handleAddTask = () => {
    if (task.trim()) {
      if (isEditing && currentTaskIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[currentTaskIndex] = task;
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, task]);
      }
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="header">
      <img src={logo} alt="Logo" className="logo" />
        <h1>Lista de Tarefas</h1>
      </div>

      <div className="task-input">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Digite uma tarefa"
        />
        <button onClick={handleAddTask}>{isEditing ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}</button>
      </div>

      <div className="task-list">
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((t, index) => (
              <li key={index} className="task-item">
                {t}
                <div className="task-actions">
                  <button onClick={() => handleEditTask(index)}>Editar</button>
                  <button onClick={() => handleDeleteTask(index)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma tarefa adicionada</p>
        )}
      </div>
    </div>
  );
}

export default App;
