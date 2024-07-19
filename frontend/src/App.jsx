import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import React from "react";
/* import { DatePicker } from "@nextui-org/react"; */
import Inicio from './components/pages/Inicio';
import RegistroUser from './components/pages/RegistroUser';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<RegistroUser />} />
        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
