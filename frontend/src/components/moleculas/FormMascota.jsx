import React, { useEffect, useState, useContext, useRef } from 'react';
import { ModalFooter, Input, Textarea, Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { CameraIcon } from '../nextUI/CameraIcon.jsx';
import MascotasContext from '../../context/MascotasContext.jsx';

const FormMascotas = ({ mode, handleSubmit, onClose, actionLabel }) => {
    const [genero, setGenero] = useState([]);
    const [nombre, setNombre] = useState('');
    const [generoOp, setGeneroOp] = useState('');
    const [raza, setRaza] = useState('');
    const [edad, setEdad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('adoptar');
    const [foto, setFoto] = useState(null);
    const [fotoUrl, setFotoUrl] = useState(''); // URL de la imagen para mostrar
    const fileInputRef = useRef(null);

    const { idMascota } = useContext(MascotasContext);

    useEffect(() => {
        const enumData = [
            { value: 'Macho', label: 'Macho' },
            { value: 'Hembra', label: 'Hembra' },
        ];
        setGenero(enumData);
    }, []);

    useEffect(() => {
        if (mode === 'update' && idMascota) {
            setNombre(idMascota.nombre || '');
            setGeneroOp(idMascota.genero || '');
            setRaza(idMascota.raza || '');
            setEdad(idMascota.edad || '');
            setDescripcion(idMascota.descripcion || '');
            setEstado(idMascota.estado || 'adoptar');
            setFotoUrl(idMascota.img || ''); // Establecer la URL de la imagen actual
            setFoto(null); // No cargar imagen en update
        } else {
            setNombre('');
            setGeneroOp('');
            setRaza('');
            setEdad('');
            setDescripcion('');
            setEstado('adoptar');
            setFotoUrl(''); // Limpiar URL de imagen
            setFoto(null);
        }
    }, [mode, idMascota]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('genero', generoOp);
        formData.append('raza', raza);
        formData.append('edad', edad);
        formData.append('descripcion', descripcion);
        formData.append('estado', estado);
        formData.append('fk_id_usuario', idMascota.fk_id_usuario);
        if (foto) {
            formData.append('img', foto);
        }

        handleSubmit(formData, e);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFoto(file);
        if (file) {
            setFotoUrl(URL.createObjectURL(file)); // Actualizar la vista previa de la imagen
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const colors = ["warning"];

    return (
        <form method='post' onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className='ml-10 align-items-center'>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <Avatar
                            showFallback
                             className="w-24 h-24 cursor-pointer"
                            onClick={handleClick}
                            src={fotoUrl || 'https://images.unsplash.com/broken'}
                            fallback={
                                <CameraIcon className="animate-pulse w-12 h-12 text-default-500" fill="currentColor" size={20} />
                            } />
                        <input
                            type="file"
                            accept="image/*"
                            name="img"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className='py-2'>
                    {colors.map((color) => (
                        <Input
                            type="text"
                            label="Nombre de la mascota"
                            className="w-80"
                            color={color}
                            key={color}
                            variant="bordered"
                            id='nombre'
                            name="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            pattern="^[a-zA-Z\s]{1,20}$"
                            title="El nombre de la mascota debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
                        />
                    ))}
                </div>
                <div className="py-2">
                    <select
                        className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        name="id_mascota"
                        value={generoOp}
                        onChange={(e) => setGeneroOp(e.target.value)}
                        required
                    >
                        <option value="" hidden className="text-gray-600">
                            Seleccionar Genero
                        </option>
                        {genero.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='py-2'>
                    {colors.map((color) => (
                        <Input
                            type="text"
                            label="Raza de la mascota"
                            className="w-80"
                            color={color}
                            key={color}
                            variant="bordered"
                            id='raza'
                            name="raza"
                            value={raza}
                            onChange={(e) => setRaza(e.target.value)}
                            required
                            pattern="^[a-zA-Z\s]{1,20}$"
                            title="La raza de la mascota debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
                        />
                    ))}
                </div>
                <div className='py-2'>
                    {colors.map((color) => (
                        <Input
                            type="number"
                            label="Edad de la mascota"
                            className="w-80"
                            color={color}
                            key={color}
                            variant="bordered"
                            id='edad'
                            name="edad"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            required
                            min="0"
                            max="20"
                            title="La edad de la mascota debe ser un número entre 0 y 20"
                        />
                    ))}
                </div>
                <div className='py-2'>
                    {colors.map((color) => (
                        <Textarea
                            label="Descripción de la mascota"
                            className="w-80"
                            color={color}
                            key={color}
                            variant="bordered"
                            id='descripcion'
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                            pattern="^[a-zA-Z\s]{1,300}$"
                            title="La descripción de la mascota debe tener máximo 300 caracteres, y solo puede contener letras y espacios"
                        />
                    ))}
                </div>
                <div className="py-2">
                    <select
                        className="pl-2 pr-4 py-2 w-10/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        disabled={mode !== 'update'}
                    >
                        <option value="" hidden>
                            Seleccionar estado
                        </option>
                        <option value="adoptar">Adoptar</option>
                        <option value="adoptada">Adoptada</option>
                        <option value="proceso adopcion">En proceso de adopción</option>
                    </select>
                </div>
                <ModalFooter>
                    <Button color="danger" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" className="bg-orange-400 text-white hover:bg-orange-500">{actionLabel}</Button>
                </ModalFooter>
            </div>
        </form>
    );
};

export default FormMascotas;
