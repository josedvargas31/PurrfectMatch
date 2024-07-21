import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Import imagenes e iconos
import imagenes from '../../styles/imagenes'
import iconos from '../../styles/iconos'
import Icon from '../atomos/IconVolver'
// Import conexion con el servidor
import axiosClient from '../axiosClient'
// Import de nextUI
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '../nextUI/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../nextUI/EyeSlashFilledIcon'
import { Select } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

// Import alertas 
import Swal from 'sweetalert2'

function RegistroUser() {
    // navegacion para poder pasar a otra vista
    const navigate = useNavigate();
    // Const donde almacena los datos del formulario por medio de formData
    const [formData, setFormData] = useState({
        identificacion: '',
        nombres: '',
        apellidos: '',
        correo: '',
        numero_cel: '',
        password: '',
        rol: 'usuario'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    //handleSubmit envía los datos del formulario a la API 
    const hangleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/registrarUsuario', formData).then((response) => {
                console.log('Datos del regsitro del usuario ', response);
                Swal.fire({
                    position: "top-center",
                    icon: 'success',
                    title: 'Usuario registrado con exito',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('iniciosesion');

            }
            )
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
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
            <div className="flex items-center justify-center bg-[#EDEBDE] min-h-screen p-2 w-full">
                <div className='relative flex flex-col m-2 space-y-5 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 '>
                    <div className="flex flex-col p-4 md:p-10">
                        <Link className='mb-2' to='/' >
                            <Icon icon={iconos.iconoVolver} className='w-6 h-6' />
                        </Link>
                        <span className="mb-2 text-4xl font-bold text-center">Registro</span>
                        <form onSubmit={hangleSubmit}>
                            <div className="py-2">
                                {colors.map((color) => (
                                    <Input
                                        type='number'
                                        label='Identificación'
                                        color={color}
                                        className='w-80'
                                        name='identificacion'
                                        value={formData.identificacion}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                            <div className="py-2">
                                {colors.map((color) => (
                                    <Input
                                        type='text'
                                        label='Ingrese sus nombres completos'
                                        color={color}
                                        className='w-80'
                                        name='nombres'
                                        id='nombres'
                                        value={formData.nombres}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                            <div className="py-2">
                                {colors.map((color) => (
                                    <Input
                                        type='text'
                                        label='Ingrese sus apellidos completos'
                                        color={color}
                                        className='w-80'
                                        name='apellidos'
                                        id='apellidos'
                                        value={formData.apellidos}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                            <div className="py-2">
                                {colors.map((color) => (
                                    <Input
                                        type='email'
                                        label='Ingrese su correo'
                                        color={color}
                                        className='w-80'
                                        defaultValue="ejemplo@gmail.com"
                                        isInvalid={false}
                                        errorMessage="Por favor ingrese un correo valido"
                                        name='correo'
                                        id='correo'
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                ))}
                            </div>
                            <div className="py-2">
                                {colors.map((color) => (
                                    <Input
                                        type='number'
                                        label='Ingrese su número de celular'
                                        color={color}
                                        className='w-80'
                                        name='numero_cel'
                                        value={formData.numero_cel}
                                        onChange={handleChange}
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
                                        value={formData.password}
                                        onChange={handleChange}
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
                            <div className="py-2">
                                {colors.map((color) => (
                                    <Select
                                        color={color}
                                        label='usuario'
                                        className='max-w-xs'
                                        isDisabled
                                    />
                                ))}
                            </div>
                            <Button color="warning" className='mt-4 w-full text-white p-2 '>
                                Registrar
                            </Button>
                        </form>
                    </div>
                    <div className='relative'>
                        <img src={imagenes.imgRegistroPets} className='w-[500px] h-full hidden rounded-r-2xl md:block object-cover' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistroUser
