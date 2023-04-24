import React, { useState } from 'react'
import './Contact.modules.css'

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validate(inputs) {
    const errors = {};
    // console.log(Object.keys(inputs));
    Object.keys(inputs).forEach((input) => {
        let value = inputs[input];
        switch (input) {
            case 'name':
                !value.length && (errors['name'] = "Se requiere un nombre");
                break;
            case 'email':
                !regexEmail.test(value) && (errors['email'] = "Debe ser un correo electrónico");
                break;
            case 'message':
                !value.length && (errors['message'] = "Se requiere un mensaje");
                break;
            default:
                break;
        }
    });
    return errors;
}

export default function Contact() {

    const defaultInputs = {
        name: "",
        email: "",
        message: "",
    }

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...inputs,
            [e.target.name]: e.target.value,
        }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(inputs);
        const thereAreErrors = Object.keys(errors).reduce((acc, key) => acc || errors[key].length, false);
        if (!thereAreErrors) {
            alert("Datos completos");
            setInputs(defaultInputs);
        } else {
            alert("Debe llenar todos los campos");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nameInput">Nombre:</label>
            <input
                id="nameInput"
                type="text"
                name="name"
                placeholder="Escribe tu nombre..."
                value={inputs.name}
                onChange={handleChange}
                className={errors.name && 'warning'}
            />
            {errors.name && (<p className='danger'>{errors.name}</p>)}
            <label htmlFor="emailInput">Correo Electrónico:</label>
            <input
                id="emailInput"
                type="text"
                name="email"
                placeholder="Escribe tu email..."
                value={inputs.email}
                onChange={handleChange}
                className={errors.email && 'warning'}
            />
            {errors.email && (<p className='danger'>{errors.email}</p>)}
            <label htmlFor="messageInput">Mensaje:</label>
            <textarea
                name="message"
                id="messageInput"
                cols="30"
                rows="10"
                type="text"
                placeholder='Escribe tu mensaje...'
                value={inputs.message}
                onChange={handleChange}
                className={errors.message && 'warning'}
            >
            </textarea>
            {errors.message && (<p className='danger'>{errors.message}</p>)}
            <button type='submit'>Enviar</button>
        </form>
    );

}
