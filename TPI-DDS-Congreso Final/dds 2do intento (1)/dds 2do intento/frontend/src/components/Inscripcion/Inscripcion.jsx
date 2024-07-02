import React, { useEffect, useState } from 'react'

import servicesInscripcion from "../../../services/inscripcion.service.js"

import TablaInscripcion from "./TablaInscripcion.jsx"
import RegistroInscripcion from "./RegistroInscripcion.jsx"

export default function Inscripcion(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})
    
    const loadGrid = async() =>{
        const data = await servicesInscripcion.getInscripciones()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onNewClick = () => {
        setAction('N')
    }

    const onActualizar = async(item)=>{
        setItem(item)
        setAction('A')
    }

    const onGuardar = async (data) => {
        const result = await servicesInscripcion.crearInscripciones(data)
        if(result){
            loadGrid()
            setAction('C')
        }

    }
    const onCancelar = () => {
        setAction('C')
        setItem({})
    }
    const actualizado = async (id, data) => {
        const result = await servicesInscripcion.actualizarInscripciones(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }
    const onEliminar = async (id) => {
        await servicesInscripcion.eliminarInscripciones(id)
        loadGrid()
}

    return (
        <>
            {
                action === 'C' && (
                    <>
                         
                         <TablaInscripcion rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaInscripcion>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistroInscripcion  onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )



} 