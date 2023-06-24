import React, { useEffect, useState } from "react";
import Form from "../form/Form";
import Loader from "../loader/Loader";
import Tabla from "../tabla/Tabla";
import axios from 'axios';

const URL = "http://localhost:3001/api/mascota/";
const URL_TOKEN = "http://localhost:3001/api/login/";
const URL_TIPOS = "http://localhost:3001/api/mascota/tipos";

const Crud = () => {
    const [mascotas, setMascotas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [mascotaU, setMascotaU] = useState(null);
    const [loading, setLoading] = useState(false);
    const credentialUser = {
        "username": "alberxo",
        "password": "123456"
    }

    useEffect(() => {
        setLoading(true);

        fetch(URL_TIPOS)
            .then((res) => {
                return res.ok ? res.json() : Promise.reject(res.status);
            })
            .then((tipos) => {
                setTipos((types) => {
                    return [...types, ...tipos]
                });

                fetch(URL_TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentialUser)
                })
                    .then(response => {
                        return response.json(); // Retornar la promesa para que se pueda encadenar otro .then
                    })
                    .then(data => {
                        localStorage.setItem('token', data.token);
                        fetch(URL, {
                            headers: {
                                'Authorization': `Bearer ${data.token}`
                            }
                        })
                            .then((res) => {
                                return res.ok ? res.json() : Promise.reject(res.status);
                            })
                            .then((mascotas) => {
                                setMascotas((pets) => {
                                    return [...pets, ...mascotas]
                                })
                            })
                            .finally(() => {
                                setLoading(false);
                            })
                    })
                    .catch(error => {
                        console.error(error);
                    });


            })

        // Limpiar el localStorage al refrescar o cerrar la pestaña
        const handleBeforeUnload = () => {
            localStorage.removeItem('token');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const createMascota = (newPet) => {
        /* newPet.id = Date.now(); */

        const addMascota = async (url, nuevaMascota) => {
            try {
                setLoading(true);
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevaMascota)
                });
                //espera la respuesta del fecth
                const data = await res.json();
                setMascotas((mascotas) => [...mascotas, data]);
                setLoading(false);
                alert("Alta exitosa!!!");

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        addMascota(URL, newPet);
    };

    const updateMascota = (updatedMascota) => {
        //console.log(updatedMascota);

        const actualizarMascota = async (url, mascotaActualizada) => {
            try {
                setLoading(true);
                //le tengo que pasar el id que se irá actualizar
                const res = await fetch(url + mascotaActualizada.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(mascotaActualizada)
                });
                //espera la respuesta del fecth
                const data = await res.json();
                setMascotas((mascotas) => {
                    return mascotas.map((mascota) =>
                        mascota.id === data.id ? data : mascota
                    );
                });
                setLoading(false);
                alert("Actualizacion exitosa!!!");

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        actualizarMascota(URL, updatedMascota);
    };

    const deleteMascota = (id) => {
        if (window.confirm("Confirma eliminación de la mascota " + id)) {
            setLoading(true);
            axios.delete(URL + id)
                .then((res) => {
                    setMascotas((mascotas) => mascotas.filter((mascota) => mascota.id !== id));
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false)
                })
        }

    };

    return (
        <section>
            <Form
                createMascota={createMascota}
                mascotaU={mascotaU}
                updateMascota={updateMascota}
                setMascotaU={setMascotaU}
                types={tipos}
            />
            <br />
            {
                loading ?
                    <Loader />
                    :
                    <Tabla mascotas={mascotas} setMascotaU={setMascotaU} deleteMascota={deleteMascota} />
            }
        </section>
    );
};

export default Crud;
