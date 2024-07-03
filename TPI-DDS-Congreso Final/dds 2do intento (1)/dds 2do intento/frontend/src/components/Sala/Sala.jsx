import React, { useEffect, useState } from 'react'

import servicesSala from "../../../services/sala.service.js"
import Filtro from '../FiltroNombre.jsx'
import TablaSala from "./TablaSala.jsx"
import RegistroSala from './RegistroSala.jsx'


export default function Sala(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})

    const loadGrid = async() =>{
        const data = await servicesSala.getSalas()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onEliminar = async (id) => {
        await servicesSala.eliminarSala(id)
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
        const result = await servicesSala.crearSala(data)
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
        const result = await servicesSala.actualizarSala(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }
    const loadGrid2 = async(filter) =>{
        const data = await servicesSala.getByFilters(filter)
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
                         <TablaSala rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaSala>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistroSala  onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )

}