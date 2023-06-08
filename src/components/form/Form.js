import React, { useEffect, useState } from 'react'
import Tipos from '../tipos/Tipos';
import "./Form.css";

const initialForm = {
  id: null,
  nombre: "",
  tipo: "",
  edad: "",
  vacunado: "",
  observaciones: "",
};

/* (nombre, tipo, botón detalles, botón modificar y botón eliminar) */

const Form = ({ createMascota, mascotaU, updateMascota, setMascotaU, types }) => {
  const [form, setForm] = useState(initialForm);
  const [tipos, setTipos] = useState(types);
  const [valorTipo, setValorTipo] = useState('');
  const { id, nombre, tipo, edad, vacunado, observaciones } = form;

  useEffect(() => {
    console.log(mascotaU);
    if (mascotaU) {
      setForm(mascotaU);
    }
  }, [mascotaU]);

  useEffect(() => {
    setTipos(types)
  }, [types]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((form) => ({ ...form, [e.target.name]: value }));
  };

  const handleSelectionChange = (valor) => {
    setValorTipo(valor);
    setForm((form) => ({ ...form, tipo: valor }));
  };


  const handleReset = () => {
    setForm(initialForm);
    setTipos(types);
    setValorTipo('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando...");
    if (!edad) {
      alert("Datos invalidos");
      return;
    }
    if (form.id) {
      updateMascota(form);
      setMascotaU(null);
    } else {
      createMascota(form);
    }
    handleReset();
  }

  return (
    <div className='p-3'>
      <div className="text-center">
        <h2>{form.id ? "Actualizar mascota" : "Nueva mascota"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="txtNombre" className='form-label'>Nombre:</label>
        <input
          type="text" id='txtNombre'
          name='nombre'
          placeholder='Ingrese nombre mascota'
          className='form-control'
          onChange={handleChange}
          value={nombre}
        />
        <label htmlFor="'txtTipo" className='form-label'>Tipo:</label>
        <Tipos
          id="txtVacunado"
          name="vacunado"
          className="form-control"
          value={vacunado}
          onSelectionChange={handleSelectionChange}
          tipos={tipos}
          mascotaU={mascotaU}
        />
        <label htmlFor="'txtEdad" className='form-label'>Edad:</label>
        <input
          type="text" id='txtEdad'
          name='edad'
          className='form-control'
          placeholder='Ingrese la edad'
          value={edad}
          onChange={handleChange}
        />
        <label htmlFor="txtVacunado" className="form-label">Vacunado:</label>
        <select
          id="txtVacunado"
          name="vacunado"
          className="form-control"
          value={vacunado}
          onChange={handleChange}
        >
          <option value={false}>No</option>
          <option value={true}>Sí</option>
        </select>
        <label htmlFor="'txtObservaciones" className='form-label'>Observaciones:</label>
        <input
          type="text" id='txtObservaciones'
          name='observaciones'
          className='form-control'
          placeholder='Ingrese alguna observacion'
          value={observaciones}
          onChange={handleChange}
        />
        <br />
        <div className="d-flex flex-row justify-content-center w-100"> 
          <input type="submit" value="Enviar" className='btn btn-primary form-control btn-block ml-3' />
          <input type="reset" onClick={handleReset} value="Limpiar" className='btn btn-danger form-control btn-block' />
        </div>
      </form>
    </div>
  )
}

export default Form