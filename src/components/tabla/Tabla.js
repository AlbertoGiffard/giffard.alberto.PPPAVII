import React from "react";
import "./Tabla.css";
import Row from "../row/Row";

const Tabla = ({ mascotas, setMascotaU, deleteMascota }) => {
  return (
    <table className="container mb-2">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Tipo</th>
          <th>Vacunado</th>
          <th>Observaciones</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          mascotas.length ?
            mascotas.map((mascota) => (
              <Row key={mascota.id} mascota={mascota} setMascotaU={setMascotaU} deleteMascota={deleteMascota}/>
            ))
            :
            <tr className="row-no-movie">
              <td colSpan="3">No hay mascotas</td>
            </tr>
        }
      </tbody>
    </table>
  );
};

export default Tabla;
