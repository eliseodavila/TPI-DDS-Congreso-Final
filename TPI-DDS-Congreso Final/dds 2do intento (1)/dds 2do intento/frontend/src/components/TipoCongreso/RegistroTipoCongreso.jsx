import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistroTipoCongreso({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Tipo de Congreso': 'Nuevo Tipo de Congreso'}</h5>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre del tipo de Congreso</label>
                    <input type="text" className="form-control" id="Nombre" placeholder="Ingrese Nombre del tipo de congreso"
                    {...register('Nombre', {required: 'Campo obligatorio'})} />
                    {errors.Nombre && <span className="text-danger">{errors.Nombre.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Descripcion"> Descripcion del tipo de Congreso </label>
                    <textarea type="text" className="form-control" id="Descripciom" placeholder="Ingrese un descripcion para el tipo de congreso"
                    {...register('Descripcion', {required: 'Campo obligatorio'})} />
                    {errors.Descripcion && <span className="text-danger">{errors.Descripcion.message}</span>}
                </div>
               
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>)
}