import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./Row.css";

const Row = ({ mascota: { id, nombre, edad, tipo, vacunado, observaciones }, setMascotaU, deleteMascota }) => {
  const vacunadoTxt = () => {
    let texto = "No";

    if (vacunado) {
      texto = "Si";
    }

    return texto;
  }

  return (
    <tr>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{tipo}</td>
      <td>{vacunadoTxt()}</td>
      <td>{observaciones}</td>
      <td className="text-center">
        <button
          className="btn btn-primary mr-2"
          onClick={() => {
            setMascotaU({ id, nombre, edad, tipo, vacunado, observaciones });
          }}
        >
          Update
        </button>
        <Link to={`mascotas/${id}`}>
          <button
            className="btn btn-success mr-2"
          >
            Details
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteMascota(id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Row;
