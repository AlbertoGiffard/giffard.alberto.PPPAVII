import React, { useEffect, useState } from 'react'

const Tipos = ({ tipos, onSelectionChange, mascotaU }) => {
    const [types, setTypes] = useState([]);
    const [selectedTipo, setSelectedTipo] = useState('');

    useEffect(() => {
        setTypes(tipos)
    }, [tipos]);

    useEffect(() => {
        console.log(mascotaU);
        if (mascotaU) {
            onSelectionChange(mascotaU.tipo);
            setSelectedTipo(mascotaU.tipo);
        }
    }, [mascotaU]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedTipo(selectedValue);
        onSelectionChange(selectedValue);
    };


    return (
        <select
            id="txtVacunado"
            name="vacunado"
            className="form-control"
            value={selectedTipo}
            onChange={handleChange}
        >
            {types && types.length ?

                types.map((type) => {
                    return (
                        <option key={type.id} value={type.descripcion}>
                            {type.descripcion}
                        </option>
                    );
                })
                :
                <option>Aguarde un momento por favor</option>
            }
        </select>
    );
};

export default Tipos