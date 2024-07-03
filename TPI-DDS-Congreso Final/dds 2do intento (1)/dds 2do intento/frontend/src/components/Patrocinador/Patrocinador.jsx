import React, { useEffect, useState } from 'react'
import servicesPatrocinador from "../../../services/patrocinador.service.js"
import Filtro from '../FiltroNombre.jsx'
import TablaPatrocinador from "./TablaPatrocinador.jsx"
import RegistrarPatrocinador from "./RegistrarPatrocinador.jsx"


export default function Patrocinador(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})

    const loadGrid = async() =>{
        const data = await servicesPatrocinador.getPatrocinador()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onEliminar = async (id) => {
        await servicesPatrocinador.eliminarPatrocinador(id)
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
        const result = await servicesPatrocinador.crearPatrocinador(data)
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
        const result = await servicesPatrocinador.actualizarPatrocinador(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }

    const loadGrid2 = async(filter) =>{
        const data = await servicesPatrocinador.getByFilters(filter)
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
                         <TablaPatrocinador rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaPatrocinador>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistrarPatrocinador onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )

}