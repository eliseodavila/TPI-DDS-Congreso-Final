import React, { useEffect, useState } from 'react'

import servicesEvaluacion from "../../../services/evaluacion.service.js"

import TablaEvaluacion from "./TablaEvaluacion.jsx"
import RegistroEvaluacion from "./RegistroEvaluacion.jsx"

export default function Evaluacion(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})
    
    const loadGrid = async() =>{
        const data = await servicesEvaluacion.getEvaluaciones()
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
        const result = await servicesEvaluacion.crearEvaluacion(data)
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
        const result = await servicesEvaluacion.actualizarEvaluacion(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }
    const onEliminar = async (id) => {
        await servicesEvaluacion.eliminarEvaluacion(id)
        loadGrid()
}

    return (
        <>
            {
                action === 'C' && (
                    <>
                         
                         <TablaEvaluacion rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaEvaluacion>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistroEvaluacion  onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )



} 