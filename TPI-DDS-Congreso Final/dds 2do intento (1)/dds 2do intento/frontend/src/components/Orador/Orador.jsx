import React, { useEffect, useState } from 'react'
import servicesOrador from "../../../services/orador.service.js"
import Filtro from '../FiltroNombre.jsx'
import TablaOrador from "./TablaOrador.jsx"
import RegistrarOrador from "./RegistrarOrador.jsx"


export default function Orador(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})

    const loadGrid = async() =>{
        const data = await servicesOrador.getOrador()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onEliminar = async (id) => {
        await servicesOrador.eliminarOrador(id)
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
        const result = await servicesOrador.crearOrador(data)
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
        const result = await servicesOrador.actualizarOrador(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }
    const loadGrid2 = async(filter) =>{
        const data = await servicesOrador.getByFilters(filter)
        setRows(data)
        }

    const onConsultar = async (filter) => {
        loadGrid2(filter)
    }

    return (
        <>
            {
                action === 'C' && (
                    <>
                         <Filtro onConsultar={onConsultar}  loadGrid= {loadGrid}></Filtro>
                         <TablaOrador rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaOrador>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistrarOrador onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )

}