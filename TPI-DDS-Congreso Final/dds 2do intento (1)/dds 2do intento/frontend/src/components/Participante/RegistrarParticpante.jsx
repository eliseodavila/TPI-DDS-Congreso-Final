import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistrarParticipante({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Datos del Participante': 'Nuevo Participante'}</h5>
                <div className="form-group">
                    <label htmlFor="NombreParticipante">Nombre del Participante</label>
                    <input type="text" className="form-control" id="NombreParticipante" placeholder="Ingrese Nombre del Participante"
                    {...register('NombreParticipante', {required: 'Campo obligatorio'})} />
                    {errors.NombreParticipante && <span className="text-danger">{errors.NombreParticipante.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="ApellidoParticipante">Apellidos del Participante</label>
                    <input type="text" className="form-control" id="ApellidoParticipante" placeholder="Ingrese Apellido del Participante"
                    {...register('ApellidoParticipante', {required: 'Campo obligatorio'})} />
                    {errors.ApellidoParticipante && <span className="text-danger">{errors.ApellidoParticipante.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="FechaNacimiento"> Fecha de nacimiento del participante </label>
                    <input type="date" className="form-control" id="FechaNacimiento" placeholder="Ingrese Fecha de Nacimiento del Participante"
                    {...register('FechaNacimiento', {required: 'Campo obligatorio'})} />
                    {errors.FechaNacimiento && <span className="text-danger">{errors.FechaNacimiento.message}</span>}
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>
        
    )}