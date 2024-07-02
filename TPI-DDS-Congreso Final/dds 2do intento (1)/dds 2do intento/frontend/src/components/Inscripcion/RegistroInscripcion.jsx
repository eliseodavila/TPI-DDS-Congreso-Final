import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistroInscripcion({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Inscripcion': 'Nueva Inscripcion'}</h5>
                {item.Id === undefined && (
                <div className="form-group">
                
                    <label htmlFor="IdCongreso">Identificador del congreso </label>
                    <input type="number" className="form-control" id="IdCongreso" placeholder="Ingrese identificador del congreso"
                    {...register('IdCongreso', {required: 'Campo obligatorio'})} />
                    {errors.IdCongreso && <span className="text-danger">{errors.IdCongreso.message}</span>}
                </div>
                )}
                {item.Id === undefined && (
                <div className="form-group">
                    <label htmlFor="IdParticipante">Identificador del participante </label>
                    <input type="number" className="form-control" id="IdParticipante" placeholder="Ingrese identificador del Participante"
                    {...register('IdParticipante', {required: 'Campo obligatorio'})} />
                    {errors.IdParticipante && <span className="text-danger">{errors.IdParticipante.message}</span>}
                </div>)}
                <div className="form-group">
                    <label htmlFor="FechaInscripcion">Fecha de Inscripcion </label>
                    <input type="date" className="form-control" id="FechaInscripcion" placeholder="Ingrese Fecha de Inscripcion"
                    {...register('FechaInscripcion', {required: 'Campo obligatorio'})} />
                    {errors.FechaInscripcion && <span className="text-danger">{errors.FechaInscripcion.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="EstadoInscripcion">Estado de la Inscripcion </label>
                        <select className="form-control" id="EstadoInscripcionr" {...register("EstadoInscripcion")}>
                            <option value="Confirmada">Confirmada</option>
                            <option value="En espera">En espera</option>
                        </select>
                        {errors.EstadoInscripcion && <span className='error'>{errors.EstadoInscripcion.message}</span>}
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>)
}