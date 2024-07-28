import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Import imagenes
import imagenes from '../../styles/imagenes'
import iconos from '../../styles/iconos'
import Icon from '../atomos/IconVolver'
// Import conexion con el servidor
import axiosClient from '../axiosClient'
// Import de nextUI
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '../nextUI/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../nextUI/EyeSlashFilledIcon'
import { Button } from "@nextui-org/button";
// Import alertas 
import Swal from 'sweetalert2'

function IniciarSesion() {

    // navegacion para poder pasar a otra vista
    const navigate = useNavigate();

    const correo = useRef(null);
    const password = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const emailValue = correo.current.value
            const passwordValue = password.current.value

            //verificar que los campos esten llenos
            if (!emailValue || !passwordValue) {
                Swal.fire({
                    title: "Los campos son obligatorios",
                    text: "Llene los campos de correo y contraseña",
                    icon: "question"
                });
            }
            // datos del formulario
            const data = {
                correo: emailValue,
                password: passwordValue
            }
            const response = await axiosClient.post('/validacion', data);
            console.log('datos enviados en la validación: ', response);

            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user[0])); // Asegúrate de que user[0] tiene la estructura correcta
                console.log(user[0]);

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Bienvenido",
                    showConfirmButton: false,
                    timer: 1500
                });

                const userRol = user[0]?.rol;
                if (userRol === 'usuario') {
                    navigate('/listmascotas');
                } else if (userRol === 'administrador') {
                    navigate('/mascotas');
                }
            } else if (response.status === 404 && response.data.message === "Usuario no autorizado") {
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Usuario no registrado",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.log('Response', response);
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Datos Incorrectos",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404 && error.response.data.message === "Usuario no autorizado") {
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Usuario no registrado",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                alert('Error del servidor: ' + error.message);
            }
        }
    }
    // const para ver el esatdo dinamico del eye del password
    const [isVisible, setIsVisible] = React.useState(false);

    // /toggleVisibility alterna la visibilidad de la contraseña entre texto y puntos.
    const toggleVisibility = () => setIsVisible(!isVisible);

    // color de los inputs
    const colors = [
        "warning",
    ];
    return (
        <>
            <div className="flex items-center justify-center bg-[#EDEBDE] min-h-screen p-4 w-full">
                <div className='relative flex flex-col m-2 space-y-5 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 '>
                    <div className="flex justify-center flex-col p-5 m-4 md:p-5">
                        <Link className='mb-2' to='/' >
                            <Icon icon={iconos.iconoVolver} className='w-6 h-6' />
                        </Link>

                        <span className="m-4 text-4xl font-bold">Inicio De Sesion</span>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={imagenes.imgPrincipalPets} className='h-32 w-32 rounded-xl' alt="" />
                        </div>
                        <div className="py-2">
                            {colors.map((color) => (
                                <Input
                                    type='email'
                                    label='Ingrese su correo'
                                    className='w-80'
                                    color={color}
                                    key={color}
                                    variant="bordered"
                                    name='correo'
                                    id='correo'
                                    ref={correo}
                                    required={true}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    title="Ingrese un correo válido"
                                />
                            ))}
                        </div>

                        <div className="py-2">
                            {colors.map((color) => (
                                <Input
                                    label='Ingrese su contraseña'
                                    color={color}
                                    key={color}
                                    variant="bordered"
                                    name='password'
                                    id='password'
                                    ref={password}
                                    required={true}
                                    title="La contraseña es obligatoria"
                                    endContent={
                                        <button type="button" onClick={toggleVisibility}>
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none mb-2" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-xs"
                                />
                            ))}
                        </div>
                        {<a href="/ruta" className="text-gray-700 hover:text-gray-900 hover:underline flex justify-center mt-3" >Olvidó su contraseña?</a>}
                        <Button color="warning" className='mt-4 w-full text-white p-2 '
                            onClick={handleSubmit} >
                            Ingresar
                        </Button>
                    </div>
                    <div className='relative'>
                        <img src={imagenes.imgInicioSesionPets} className='w-[500px] h-full hidden rounded-r-2xl md:block object-cover' />
                    </div>
                </div>
            </div>

        </>
    )
}

export default IniciarSesion
