import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Import imagenes
import imagenes from '../../styles/imagenes'
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

    const handleSubmit = (e) => {
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
            axiosClient.post('/validacion', data).then((response) => {
                console.log('datos enviados en la validación: ', response)
                // condicional que envia un estado, envia el token y el usuario a la consola
                if (response.status === 200) {
                    const { token, user } = response.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(response.data.user[0]))
                    console.log(response.data.user[0])
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Bienvenido",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    const userRol = user[0]?.rol
                    //condicional para separar los roles
                    if (userRol === 'usuario') {
                        navigate('/usuarop')
                    } else if (userRol === 'administrador') {
                        navigate('/Inicio')

                    }
                    //condicionales que verifican si hay algo mal
                } else {
                    console.log('Response', response)
                    setMensaje('Credenciales incorrectas')
                    setModalAcciones(true)
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "Datos Incorrectos",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        } catch (error) {
            console.log(error)
            alert('Error del servidor' + error)
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
                        <Link className='mb-5' to='/'>
                            {/*  <Icon icon={v.iconoVolver} className='w-6 h-6' /> */}
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
                                    name='correo'
                                    id='correo'
                                    ref={correo}
                                />
                            ))}
                        </div>
                        <div className="py-2">
                            {colors.map((color) => (
                                <Input
                                    label='Ingrese su contraseña'
                                    color={color}
                                    name='password'
                                    id='password'
                                    ref={password}
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
