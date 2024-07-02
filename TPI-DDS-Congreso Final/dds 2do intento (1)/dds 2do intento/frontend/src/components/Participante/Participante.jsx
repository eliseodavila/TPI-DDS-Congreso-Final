import React, { useEffect, useState } from 'react'
import servicesParticipante from "../../../services/participante.service.js"

import TablaParticipante from "./TablaParticipante.jsx"
import RegistrarParticipante from "./RegistrarParticpante.jsx"


export default function Participante(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})

    const loadGrid = async() =>{
        const data = await servicesParticipante.getParticipante()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onEliminar = async (id) => {
        await servicesParticipante.eliminarParticipante(id)
        loadGrid()
    }

    const onNewClick = () => {
        setAction('N')
    }

    const onActualizar = async(item)=>{
        setItem(item)
        setAction('A')
    }

    const onGuardar = async (data) => {
        const result = await servicesParticipante.crearParticipante(data)
        if(result){
            loadGrid()
            setAction('C')
        }

    }
    const onCancelar = () => {
        setAction('C')
    }

    const actualizado = async (id, data) => {
        const result = await servicesParticipante.actualizarParticipante(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }

    return (
        <>
            {
                action === 'C' && (
                    <>
                         
                         <TablaParticipante rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaParticipante>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistrarParticipante onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )

}