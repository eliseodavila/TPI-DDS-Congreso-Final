import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistroEvaluacion({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Evaluacion': 'Nueva Evaluacion'}</h5>
                <div className="form-group">
                    <label htmlFor="IdCongreso">Identificador del congreso </label>
                    <input type="number" className="form-control" id="IdCongreso" placeholder="Ingrese identificador del congreso"
                    {...register('IdCongreso', {required: 'Campo obligatorio'})} />
                    {errors.IdCongreso && <span className="text-danger">{errors.IdCongreso.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="IdParticipante">Identificador del participante </label>
                    <input type="number" className="form-control" id="IdParticipante" placeholder="Ingrese identificador del Participante"
                    {...register('IdParticipante', {required: 'Campo obligatorio'})} />
                    {errors.IdParticipante && <span className="text-danger">{errors.IdParticipante.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="Puntuacion">Puntuacion </label>
                    <input type="number" className="form-control" id="Puntuacion" placeholder="Ingrese Puntuacion"
                    {...register('Puntuacion', {required: 'Campo obligatorio'})} />
                    {errors.Puntuacion && <span className="text-danger">{errors.Puntuacion.message}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="Comentarios">Comentarios</label>
                    <textarea type="text" className="form-control" id="Comentarios" placeholder="Ingrese Comentarios"
                    {...register('Comentarios', {required: 'Campo obligatorio'})} />

                    {errors.Comentarios && <span className="text-danger">{errors.Comentarios.message}</span>}     
                </div>
                <div className="form-group">
                    <label htmlFor="Fecha"> Fecha de la evaluacion</label>
                    <input type="date" className="form-control" id="Fecha" placeholder="Ingrese la Fecha"
                    {...register('Fecha', {required: 'Campo obligatorio'})} />
                    {errors.Fecha && <span className="text-danger">{errors.Fecha.message}</span>}
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>)
}