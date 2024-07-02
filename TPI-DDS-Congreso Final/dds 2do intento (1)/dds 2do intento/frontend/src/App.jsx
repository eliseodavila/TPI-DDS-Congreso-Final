import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"

import {Menu} from "./components/Menu"
import {Footer} from './components/Footer'
import PagInicio from "./components/PagInicio"
import Evaluacion from './components/Evaluacion/Evaluacion'
import Congresos from './components/Congreso/TablaCongreso'

import Sala from './components/Sala/Sala'
import Congreso from './components/Congreso/Congreso'
import TipoCongreso from "./components/TipoCongreso/TipoCongreso"
import Orador from './components/Orador/Orador'
import Participante from './components/Participante/Participante'
import Patrocinador from './components/Patrocinador/Patrocinador'
function App() {
  

  return (
    <>
    <BrowserRouter>

      <Menu/>
     
      <div className="divBody">
          <Routes>
          <Route path="/Inicio" element={<PagInicio/>}/>
          <Route path="/congresos" element={<Congresos/>}/>
          <Route path="/evaluacion" element={<Evaluacion/>}/>
          <Route path="/sala" element={<Sala/>}/>
          <Route path="/tipoCongreso" element={<TipoCongreso/>}/>
          <Route path="/congreso" element={<Congreso/>}/>
          <Route path="/orador" element={<Orador/>}/>
          <Route path="/participante" element={<Participante/>}/>
          <Route path="/patrocinador" element={<Patrocinador/>}/>
          <Route path="*" element={<Navigate to="/Inicio" replace />}/> 
                
          </Routes>
        </div>
      <Footer/>
      </BrowserRouter>
    
    </>
  )
}

export default App
