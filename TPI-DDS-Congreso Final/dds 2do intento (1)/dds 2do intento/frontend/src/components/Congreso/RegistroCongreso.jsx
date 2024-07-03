import React from "react";

import {useForm} from 'react-hook-form' 

export default function RegistrarCongreso({onGuardar, onCancelar, item, actualizado}){
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
                <h5>{item.Id !==undefined?'Actualizar Datos del Congreso': 'Nuevo Congreso'}</h5>
                <div className="form-group">
                    <label htmlFor="NombreCongreso">Nombre del Congreso</label>
                    <input type="text" className="form-control" id="NombreCongreso" placeholder="Ingrese Nombre del Congreso"
                    {...register('NombreCongreso', {required: 'Campo obligatorio'})} />
                    {errors.NombreCongreso && <span className="text-danger">{errors.NombreCongreso.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="DescripcionCongreso">Descripcion del Congreso</label>
                    <textarea type="text" className="form-control" id="DescripcionCongreso" placeholder="Ingrese Descripcion del Congreso"
                    {...register('DescripcionCongreso', {required: 'Campo obligatorio'})} />
                    {errors.DescripcionCongreso && <span className="text-danger">{errors.DescripcionCongreso.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="FechaCongreso">Fecha del Congreso </label>
                    <input type="date" className="form-control" id="FechaCongreso" placeholder="Ingrese Fecha del Congreso"
                    {...register('FechaCongreso', {required: 'Campo obligatorio'})} />
                    {errors.FechaCongreso && <span className="text-danger">{errors.FechaCongreso.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="IdTipoCongreso">Identificador del Tipo de Congreso</label>
                    <input type="text" className="form-control" id="IdTipoCongreso" placeholder="Ingrese Identificador del Tipo de Congreso"
                    {...register('IdTipoCongreso', {required: 'Campo obligatorio'})} />
                    {errors.IdTipoCongreso && <span className="text-danger">{errors.IdTipoCongreso.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="IdOrador">Identificador del Orador</label>
                    <input type="text" className="form-control" id="IdOrador" placeholder="Ingrese Identificador del Orador"
                    {...register('IdOrador', {required: 'Campo obligatorio'})} />
                    {errors.IdOrador && <span className="text-danger">{errors.IdOrador.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="IdSala">Identificador de la sala</label>
                    <input type="text" className="form-control" id="IdSala" placeholder="Ingrese Identificador de la sala"
                    {...register('IdSala', {required: 'Campo obligatorio'})} />
                    {errors.IdSala && <span className="text-danger">{errors.IdSala.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="IdPatrocinador">Identificador  del Patrocinador</label>
                    <input type="text" className="form-control" id="IdPatrocinador" placeholder="Ingrese Identificador del Patrocinador"
                    {...register('IdPatrocinador', {required: 'Campo obligatorio'})} />
                    {errors.IdPatrocinador && <span className="text-danger">{errors.IdPatrocinador.message}</span>}
                </div>
                <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary mx-1">Guardar</button>
                    <button type="button" onClick={onCancelar}  className="btn btn-secondary mx-1"> Cancelar</button>
                </div>
            </form>
        </>
        
    )}