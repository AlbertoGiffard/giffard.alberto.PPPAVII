import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom';
import Loader from "../loader/Loader";
import "./Check.css";

const Check = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [mascota, setMascota] = useState({});
    const { nombre, edad, tipo, vacunado, observaciones } = mascota;

    useEffect(() => {
        const URL = `http://localhost:3001/api/mascota/${id}`;
        setLoading(true);

        fetch(URL)
            .then((res) => res.ok ? res.json() : Promise.reject(res.status + ":" + res.status.text))
            .then((mascota) => {
                setMascota(mascota);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id])

    const show = () => {
        return (
            <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
                <div className="card w-50  mx-auto container-bg">
                    <div className="card-body">
                        <h5 className="card-title display-2">{nombre}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary"><p className="fw-bold">Edad:</p> {edad}</h6>
                        <p className="card-text"><p className="fw-bold">Tipo:</p><span>{tipo}</span></p>
                        <p className="card-text"><p className="fw-bold">Vacunado:</p>
                            {vacunado ? "Si" : "No"}
                        </p>
                        <p className="card-text"><p className="fw-bold">Observaciones:</p> {observaciones}</p>
                    </div>
                </div>
                <div className="m-3">

                    <Link to="/">
                        <button className="btn btn-success">
                            Volver
                        </button>
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div className="text-center my-auto">
            {loading ? (
                <Loader />
            ) : (
                show()
            )}
        </div>
    )
}

export default Check