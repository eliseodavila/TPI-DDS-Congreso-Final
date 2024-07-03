import React from "react";
import { Link } from "react-router-dom";


function PagInicio() {

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="jumbotron">
                        <h1 className="display-4">Bienvenido a nuestra plataforma de congresos</h1>
                        <p className="lead">Descubre y participa en eventos educativos y profesionales.</p>
                        <hr className="my-4" />
                        <p>Explora nuestra lista de congresos para encontrar el próximo evento que te interese.</p>
                        <Link to="/congresos" className="btn btn-primary btn-lg">
                            <i className="fa fa-search"></i> Ver todos los congresos
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card mb-3">
                        <img src="https://novicap.com/assets/uploads/2016/04/charlas-ted-1.jpg" className="card-img-top" alt="Imagen de ejemplo" />
                        <div className="card-body">
                            <h5 className="card-title">¿Qué ofrecemos?</h5>
                            <p className="card-text">Acceso a una amplia gama de congresos en diversas áreas de interés.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-3">
                        <img src="https://assets.weforum.org/article/image/large_5BrnESyw0TFWC_RsaKtOENgl6z0pM25GX7jlzYDqHTo.jpg" className="card-img-top" alt="Imagen de ejemplo" />
                        <div className="card-body">
                            <h5 className="card-title">¿Por qué elegirnos?</h5>
                            <p className="card-text">Organización confiable y fácil acceso a la información relevante.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PagInicio