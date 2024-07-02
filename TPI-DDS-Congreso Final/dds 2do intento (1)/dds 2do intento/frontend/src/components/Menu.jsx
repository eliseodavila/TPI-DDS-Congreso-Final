import React from "react";
import { NavLink } from "react-router-dom";

function Menu(){
    return (
        <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><NavLink className="nav-link" to='/Inicio'>Inicio</NavLink></li>
          <li><NavLink className="nav-link" to='/congreso'>Congresos</NavLink></li>
          <li><NavLink className="nav-link" to='/evaluacion'>Evaluaciones</NavLink></li>
          <li><NavLink className="nav-link" to='/sala'>Salas</NavLink></li>
          <li><NavLink className="nav-link" to='/patrocinador'>Patrocinadores</NavLink></li>
          <li><NavLink className="nav-link" to='/participante'>Participantes</NavLink></li>
          <li><NavLink className="nav-link" to='/tipoCongreso'>Tipos de congresos</NavLink></li>
          <li><NavLink className="nav-link" to='/orador'>Oradores</NavLink></li>
          <li><NavLink className="nav-link" to='/inscripcion'>Inscripciones</NavLink></li>
        </ul>
      </div>
    </div>
  </header>

       
       
    )
}

export {Menu}