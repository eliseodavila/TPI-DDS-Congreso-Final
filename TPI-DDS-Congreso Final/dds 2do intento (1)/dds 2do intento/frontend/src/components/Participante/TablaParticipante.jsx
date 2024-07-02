import React from "react";

export default function Tabla({rows , onNewClick, onActualizar, onEliminar}){
    
    const filteredRows = rows.filter(e => e.Activo);
    const tbody = filteredRows.map(e => 
        <tr key={e.Id}>
            <td>{e.Id}</td>
            <td>{e.NombreParticipante}</td>
            <td>{e.ApellidoParticipante}</td>
            <td>{e.FechaNacimiento}</td>
            <td>
            {e.Activo && (
                    <button
                        disabled={e.Eliminado === true}
                        className="btn btn-sm btn-danger"
                        onClick={() => { onEliminar(e.Id) }}
                    >
                        Eliminar
                    </button>
                )}
            </td>

            <td>
                 {
                     (<button disabled={e.Eliminado === true} className="btn btn-sm btn-secondary"  onClick={()=>{onActualizar(e)}}>Actualizar</button>)   
                 }  

            </td>
        </tr>
    )

    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between aling-items-center">
                    <span>Resultados:</span>
                    <button type="button" className="btn btn-primary" onClick={onNewClick} >
                         Nuevo Participante
                    </button>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <th>Identificacion</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>              
                        </thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>

            </div>
        </>
    )
}