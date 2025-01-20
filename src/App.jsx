import { useState, useEffect } from 'react'
import './App.css'
import USER from "./components/user/USER"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ABOUT from './components/ABOUT';
import CHATS from './components/CHATS';


function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {

  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<USER />} />
          <Route path="/about" element={<ABOUT />} />
          <Route path="/chats" element={<CHATS />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
