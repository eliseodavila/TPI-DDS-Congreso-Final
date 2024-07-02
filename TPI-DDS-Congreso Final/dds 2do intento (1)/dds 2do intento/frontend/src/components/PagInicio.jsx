import React from "react";
import { Link } from "react-router-dom";


function PagInicio() {

    return (
        <>
            <h1>Inicio</h1>
            <Link to="/congresos" className="btn btn-lg btn-primary">
                <i className="fa fa-search"> </i> Ver todos los congresos
            </Link>
        </>
    )
}


export default PagInicio