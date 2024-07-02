import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistroSala({onGuardar, onCancelar, item, actualizado}){
    const {register, handleSubmit, formState: {errors}} = useForm({values: item})

    const onSubmit = (data) => {
        if (item.Id)
            actualizado(item.Id,data) 
        else
            onGuardar(data)
    }
        
    
    return(
        <>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h5>{item.Id !==undefined?'Actualizar Sala': 'Nueva Sala'}</h5>
                <div className="form-group">
                    <label htmlFor="NombreSala">Nombre de la Sala</label>
                    <input type="text" className="form-control" id="NombreSala" placeholder="Ingrese Nombre de la Sala"
                    {...register('NombreSala', {required: 'Campo obligatorio'})} />
                    {errors.NombreSala && <span className="text-danger">{errors.NombreSala.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Capacidad"> Capacidad de la sala </label>
                    <input type="number" className="form-control" id="Capacidad" placeholder="Ingrese Capacidad de sala"
                    {...register('Capacidad', {required: 'Campo obligatorio'})} />
                    {errors.Capacidad && <span className="text-danger">{errors.Capacidad.message}</span>}
                </div>
               
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>)
}