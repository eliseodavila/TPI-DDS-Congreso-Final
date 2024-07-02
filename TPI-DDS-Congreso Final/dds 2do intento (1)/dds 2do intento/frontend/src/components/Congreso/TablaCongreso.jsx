import React from "react";

export default function Tabla({rows ,onEliminar}){
    const escribir = (booleano)=>{
        if (booleano){
            return ('SI')
        }
        return('NO')
    }
{/* Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    NombreCongreso TEXT,
                    DescripcionCongreso TEXT,
                    FechaCongreso DATE,
                    IdTipoCongreso INTEGER,
                    IdOrador INTEGER,
                    IdSala INTEGER,
                    IdPatrocinador INTEGER,
                    Activo BOOLEAN DEFAULT TRUE,*/}
    const tbody = rows.map(e => 
        <tr key={e.Id}>
            <td>{e.Id}</td>
            <td>{e.NombreCongreso}</td>
            <td>{e.DescripcionCongreso}</td>
            <td>{e.FechaCongreso}</td>
            <td>{e.IdTipoCongreso}</td>
            <td>{e.IdOrador}</td>
            <td>{e.IdSala}</td>
            <td>{e.IdPatrocinador}</td>
            <td>{escribir(e.Activo)}</td>
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
                     (<button disabled={e.Eliminado === true} className="btn btn-sm btn-secondary"  >Actualizar</button>)   
                 }  

            </td>
        </tr>
    )

    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between aling-items-center">
                    <span>Resultados:</span>
                    <button type="button" className="btn btn-primary">
                         Nuevo Congreso
                    </button>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <th>Identificacion</th>
                            <th>Nombre</th>
                            <th>Descriipcion</th>
                            <th>Fecha</th>
                            <th>Tipo Congreso</th>
                            <th>Orador</th>
                            <th>sala</th>
                            <th>Patrocinador</th>
                            <th>Activo</th>
                          
                        </thead>
                        <tbody>{tbody}</tbody>
                    </table>
                </div>

            </div>
        </>
    )
}