import React, { useEffect, useState } from 'react'

import servicesCongreso from "../../../services/congreso.service.js"

import TablaCongreso from "./TablaCongreso.jsx"

export default function Congreso(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')

    const loadGrid = async() =>{
        const data = await servicesCongreso.getCongresos()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onEliminar = async (id) => {
        await servicesCongreso.eliminarCongreso(id)
        loadGrid()
    }

    return (
        <>
            {
                action === 'C' && (
                    <>
                         
                         <TablaCongreso rows={rows}  onEliminar={onEliminar} ></TablaCongreso>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        
                    </>
                )
            }
        </>
    )

}