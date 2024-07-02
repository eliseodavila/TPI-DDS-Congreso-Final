import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistrarPatrocinador({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Datos del Patrocinador': 'Nuevo Patrocinador'}</h5>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre del Patrocinador</label>
                    <input type="text" className="form-control" id="Nombre" placeholder="Ingrese Nombre del Patrocinador"
                    {...register('Nombre', {required: 'Campo obligatorio'})} />
                    {errors.Nombre && <span className="text-danger">{errors.Nombre.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Descripcion">Descripcion del Patrocinador</label>
                    <textarea type="text" className="form-control" id="Descripcion" placeholder="Ingrese Descripcion del Patrocinador"
                    {...register('Descripcion', {required: 'Campo obligatorio'})} />
                    {errors.Descripcion && <span className="text-danger">{errors.Descripcion.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Email"> Email del patrocinador </label>
                    <input type="email" className="form-control" id="Email" placeholder="Ingrese Email del patrocinador"
                    {...register('Email', {required: 'Campo obligatorio'})} />
                    {errors.Email && <span className="text-danger">{errors.Email.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Telefono">Telefono del Patrocinador</label>
                    <input type="text" className="form-control" id="Telefono" placeholder="Ingrese Telefono del Patrocinador"
                    {...register('Telefono', {required: 'Campo obligatorio'})} />
                    {errors.Telefono && <span className="text-danger">{errors.Telefono.message}</span>}
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>
        
    )}