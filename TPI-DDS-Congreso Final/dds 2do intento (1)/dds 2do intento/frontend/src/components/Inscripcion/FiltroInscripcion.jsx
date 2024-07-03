import React, { useState } from 'react'

export default function Filtro({ onConsultar,loadGrid }) {
    const [filter, setFilter] = useState('')

    const onClick = ()=>{
        onConsultar(filter)
    }

    return (
        <div className="card">
            <h6 className="card-header">Consulta </h6>
            <div className="card-body">
                <h6>Ingrese identificador de Participante</h6>
                <input type='text' onChange={(e)=>{setFilter(e.target.value)}} className='mx-1'></input>
                <button className="btn btn-success mx-1" onClick={onClick} >Consultar</button>
                <button className="btn btn-success mx-1" onClick={loadGrid} >Volver</button>
            </div>
        </div>
    )
}