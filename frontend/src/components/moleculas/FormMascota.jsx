import React, { useEffect, useState, useContext } from 'react';
// Import conexion con el servidor
import axiosClient from '../axiosClient';
// Import de nextUI
import { ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
// Import Context Vacunas
import VacunasContext from './../../context/VacunasContext.jsx';

const FormMascotas = ({ mode, handleSubmit, onClose, actionLabel }) => {

    const [estado, setEstado] = useState([]);

    const [nombre, setNombre] = useState('');
    const [generoOp, setGeneroOp] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [foto, setFoto] = useState('');
    const [descripcion, SetDescripcion] = useState('');
    const [estadoOp, setEstadoOp] = useState('adoptar');

    const { idMascota } = useContext(VacunasContext);


    useEffect(() => {
        const enumData = [
            { value: 'Macho', label: 'Macho' },
            { value: 'Hembra', label: 'Hembra' },
        ];
        setGeneroOp(enumData);
    }, []);

    useEffect(() => {
        if (mode === 'update' && idMascota) {
            setNombre(idMascota.nombre);
            setGeneroOp(idMascota.genero);
            setRaza(idMascota.raza);
            setEdad(idMascota.edad);
            setFoto(idMascota.foto);
            SetDescripcion(idMascota.descripcion);
            setEstadoOp(idMascota.estado);
        }
    }, [mode, idMascota]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                nombre: nombre,
                genero: generoOp,
                raza: raza,
                edad: edad,
                foto: foto,
                descripcion: descripcion,
                estado: estadoOp,
            };
            handleSubmit(formData, e);
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    };


    return (
        <form method='post' onSubmit={handleFormSubmit}>
            <div className='ml-5 align-items-center '>
                <div className='py-2'>
                    <Input
                        type="text"
                        label="Nombre de la mascota"
                        className="w-80"
                        id='nombre'
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        pattern="^[a-zA-Z\s]{1,20}$"
                        title="El nombre de la mascota debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
                    />
                </div>
                <div className="py-2">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800"></span>
                    <select
                        className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        name="id_mascota"
                        value={generoOp}
                        onChange={(e) => setGeneroOp(e.target.value)}
                        required={true}
                    >
                        <option value="" hidden className="text-gray-600">
                            Seleccionar Genero
                        </option>
                        {generoOp.map(gene => (
                            <option key={gene.id_mascota} value={gene.id_mascota}>
                                {gene.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='py-2'>
                    <Input
                        className='w-80'
                        type="raza"
                        label='Ingrese la raza'
                        id='raza'
                        name="raza"
                        value={raza}
                        onChange={(e) => setRaza(e.target.value)}
                        required
                        pattern="^[a-zA-Z\s]{1,20}$"
                        title="El nombre de la raza debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
                    />
                </div>
                <div className='py-2'>
                    <Input
                        className='w-80'
                        type="edad"
                        label='Ingrese la edad de la mascota'
                        id='edad'
                        name="edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        required
                        pattern="^[a-zA-Z\s]{1,20}$"
                        title="La edad de la mascota debe tener máximo 20 caracteres, y solo puede numeros"
                    />
                </div>
                <div className="py-2">
                    <Textarea
                        label="Descripcion de la mascota"
                        labelPlacement="outside"
                        isRequired
                        className='w-80'
                        id='Description'
                        name="Description"
                        alue={descripcion}
                        onChange={(e) => SetDescripcion(e.target.value)}
                    />
                </div>
                <div className="py-2">
                    <select
                        label="Estado"
                        className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        value={estadoOp}
                        onChange={(e) => setEstadoOp(e.target.value)}
                        disabled
                    >
                        <option value="" disabled hidden>
                            Seleccionar estado
                        </option>
                        {estado.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="warning" className='mt-4 w-full text-white p-2 '>
                        {actionLabel}
                    </Button>
                </ModalFooter>
            </div>
        </form>
    );
}