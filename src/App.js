import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form'
import TodoList from './components/TodoList';

function App() {
  // Estados
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  //Corre una sola vez al iniciar la app
  useEffect(() => {
    getLocaltodos()
  }, [])
  // USE EFFECT
  useEffect(()=>{
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  // Filtrado

  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
  
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos))
  }  

  const getLocaltodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      setTodos(todoLocal)
    }
  }
  return (
    <div className="App">
      <header>
        <div className='container'>
          <h1>Tareas</h1>
          <h2>No dejes para mañana lo que podés hacer hoy</h2>
       </div>
      </header>
      <Form 
      inputText={inputText}
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
      />
      <TodoList 
      filteredTodos={filteredTodos} 
      setTodos={setTodos} 
      todos={todos}/>
    </div>
  );
}

export default App;
