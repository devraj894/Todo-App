import React from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'
import './index.css'

function App() {

  return (
    <>
    <h1 className='bg-gray-500'>Make you own ToDo</h1>
    <TodoList />
    </>
  )
}

export default App;

