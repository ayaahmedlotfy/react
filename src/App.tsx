import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import Form from './components/Form';
import Users from './components/Users';
import Show from './components/Show';
import Register from './components/Register';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<Show />} />
      </Routes>
  </Router>
  
  )
}

export default App
