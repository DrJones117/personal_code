import { useState } from 'react'
import './App.css'
import TodoForm from './TodoForm'
import GetTodos from './GetTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <TodoForm></TodoForm> */}
      <GetTodos></GetTodos>
    </>
  )
}

export default App
