import React, { useEffect, useState } from 'react'
import servicesTipoCongreso from "../../../services/tipocongreso.service.js"
import Filtro from '../FiltroNombre.jsx'
import TablaTipoCongreso from "./TablaTipoCongreso.jsx"
import RegistroTipoCongreso from './RegistroTipoCongreso.jsx'


export default function TipoCongreso(){
    const [rows, setRows] = useState([])
    const [action, setAction] = useState('C')
    const [item, setItem] = useState({})

    const loadGrid = async() =>{
        const data = await servicesTipoCongreso.getTipoCongreso()
        setRows(data)
    }

    useEffect(() => {
        loadGrid()
    }, [])

    const onEliminar = async (id) => {
        await servicesTipoCongreso.eliminarTipoCongreso(id)
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
        const result = await servicesTipoCongreso.crearTipoCongreso(data)
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
        const result = await servicesTipoCongreso.actualizarTipoCongreso(id, data)
        if(result){
            loadGrid()
            setAction('C')
            setItem({})
        }
    }
    const loadGrid2 = async(filter) =>{
        const data = await servicesTipoCongreso.getByFilters(filter)
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
                         <TablaTipoCongreso rows={rows} onNewClick={onNewClick} onActualizar={onActualizar} onEliminar={onEliminar} ></TablaTipoCongreso>
                    </>
                ) 
            }
            {
                action !== 'C' && (
                    <>
                        <RegistroTipoCongreso  onGuardar={onGuardar} onCancelar={onCancelar} item = {item} actualizado={actualizado}/>
                    </>
                )
            }
        </>
    )

}