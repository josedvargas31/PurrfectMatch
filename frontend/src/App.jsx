import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import React from "react";
/* import { DatePicker } from "@nextui-org/react"; */
import Inicio from './components/pages/Inicio';
import RegistroUser from './components/pages/RegistroUser';
import IniciarSesion from './components/pages/IniciarSesion';
import DashboardAdmi from './components/pages/DashboardAdmi';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/iniciosesion" element={<IniciarSesion />} />
          <Route path="/registro" element={<RegistroUser />} />
          <Route path="/inicioadmi" element={<DashboardAdmi />} />
        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
