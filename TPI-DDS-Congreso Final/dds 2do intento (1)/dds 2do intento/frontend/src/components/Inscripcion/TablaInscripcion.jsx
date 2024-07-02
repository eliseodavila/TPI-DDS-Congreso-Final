import React from "react";

export default function Tabla({rows , onNewClick, onActualizar, onEliminar}){

    const tbody = rows.map(e => 
        <tr key={e.Id}>
            <td>{e.Id}</td>
            <td>{e.IdCongreso}</td>
            <td>{e.IdParticipante}</td>
            <td>{e.FechaInscripcion}</td>
            <td>{e.EstadoInscripcion}</td>
            
            <td>
                 {
                     (<button disabled={e.Eliminado === true} className="btn btn-sm btn-danger"  onClick={()=>{onEliminar(e.Id)}}>Eliminar</button>)   
                 }  

            </td>

            {
                e.EstadoInscripcion !== 'Confirmada' && (
                    <button disabled={e.Eliminado === true} className="btn btn-sm btn-secondary" onClick={() => { onActualizar(e) }}>
                        Actualizar
                    </button>
                )
            }
        </tr>
    )

    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between aling-items-center">
                    <span>Resultados:</span>
                    <button type="button" onClick={onNewClick} className="btn btn-primary">
                         Nueva Inscripcion
                    </button>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <th>Identificacion</th>
                            <th>Congreso</th>
                            <th>Participante</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>

            </div>
        </>
    )
}