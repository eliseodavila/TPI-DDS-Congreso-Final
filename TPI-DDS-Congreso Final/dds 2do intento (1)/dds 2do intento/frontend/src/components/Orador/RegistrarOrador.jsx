import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistrarOrador({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Datos del Orador': 'Nuevo Orador'}</h5>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre del Orador</label>
                    <input type="text" className="form-control" id="Nombre" placeholder="Ingrese Nombre del orador"
                    {...register('Nombre', {required: 'Campo obligatorio'})} />
                    {errors.Nombre && <span className="text-danger">{errors.Nombre.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Apellidos">Apellidos del Orador</label>
                    <input type="text" className="form-control" id="Apellidos" placeholder="Ingrese Apellido del orador"
                    {...register('Apellidos', {required: 'Campo obligatorio'})} />
                    {errors.Apellidos && <span className="text-danger">{errors.Apellidos.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Biografia"> Biografia del Orador </label>
                    <textarea type="text" className="form-control" id="Biografia" placeholder="Ingrese Biografia para el Orador"
                    {...register('Biografia', {required: 'Campo obligatorio'})} />
                    {errors.Biografia && <span className="text-danger">{errors.Biografia.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Email">Email del Orador</label>
                    <input type="email" className="form-control" id="Email" placeholder="Ingrese Email del orador"
                    {...register('Email', {required: 'Campo obligatorio'})} />
                    {errors.Email && <span className="text-danger">{errors.Email.message}</span>}
                </div>
               
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>)
}