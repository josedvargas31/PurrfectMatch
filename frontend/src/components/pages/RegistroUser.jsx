import React, { useState } from 'react'
import imagenes from '../../styles/imagenes'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import axiosClient from '../axiosClient'

// Import de nextUI
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '../nextUI/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../nextUI/EyeSlashFilledIcon'
import { Select } from "@nextui-org/select";
import Swal from 'sweetalert2'

function RegistroUser() {

    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState('');
    const [modalAccion, setModalAccion] = useState(false);

    // Const donde almacena los datos del formulario por medio de formData
    const [formData, setFormData] = useState({
        identificacion: '',
        nombres: '',
        apellidos: '',
        correo: '',
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
    const [isVisble, setIsVsible] = React.useState(false);

    // /toggleVisibility alterna la visibilidad de la contraseña entre texto y puntos.
    const toggleVisibility = () => setIsVsible(!isVisble);

    return (
        <div>
            <>
                <div className="flex items-center justify-center bg-[#EDEBDE] min-h-screen p4 w-full">
                    <div className="flex flex-col p-5 m-4 md:p-5">
                        <Link className='mb-2' to='/' >
                            {/* <Icon /> */}

                        </Link>
                        <span className="mb-2 text-4xl font-bold text-center">Registro</span>
                        <form onSubmit={hangleSubmit}>
                            <div className="py-2">
                                <Input
                                    type='number'
                                    label='Identificación'
                                    variant='bordered'
                                    className='w-80'
                                    name='identificacion'
                                    value={formData.identificacion}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-2">
                                <Input
                                    type='text'
                                    lable='Ingrese sus nombres completos'
                                    variant='bordered'
                                    className='w-80'
                                    name='nombres'
                                    id='nombres'
                                    value={formData.nombres}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-2">
                                <Input
                                    type='text'
                                    label='Ingrese sus apellidos completos'
                                    variant='bordered'
                                    className='w-80'
                                    name='apellidos'
                                    id='apellidos'
                                    value={formData.apellidos}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-2">
                                <Input
                                    type='email'
                                    label='Ingrese su correo'
                                    variant='bordered'
                                    className='w-80'
                                    name='correo'
                                    id='correo'
                                    value={formData.correo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-2">
                                <Input
                                    type='Ingrese su contraseña'
                                    variant='bordered'
                                    name='password'
                                    id='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                   /*  endContent={
                                        
                                    } */
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        </div>
    )
}

export default RegistroUser
