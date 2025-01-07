import React, { useEffect, useState, useContext } from 'react';
import axiosClient from '../axiosClient';
import { ModalFooter, Button, Input } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import VacunasContext from '../../context/VacunasContext';

const FormVacunas = ({ initialData, mode, handleSubmit, onClose, actionLabel }) => {
    const [mascotas, setMascotas] = useState([]);
    const [estado, setEstado] = useState([]);

    const [mascotaFK, setMascotaFk] = useState('');
    const [fechaVacuna, setFechaVacuna] = useState(null);
    const [enfermedad, setEnfermedad] = useState('');
    const [estadoOp, setEstadoOp] = useState('');

    const { idVacuna } = useContext(VacunasContext);

    useEffect(() => {
        const enumData = [
            { value: 'Completa', label: 'Completa' },
            { value: 'Incompleta', label: 'Incompleta' },
            { value: 'En proceso', label: 'En proceso' },
            { value: 'no se', label: 'no se' },
        ];
        setEstado(enumData);
    }, []);

    useEffect(() => {
        axiosClient.get('/mascota/listar').then((response) => {
            const mascotaFilter = response.data.filter((mascota) => mascota.estado === 'adoptar');
            setMascotas(mascotaFilter);
        });
    }, []);

    useEffect(() => {
        if (mode === 'update' && idVacuna) {
            setMascotaFk(idVacuna.fk_id_mascota);
            setFechaVacuna(idVacuna.fecha_vacuna);
            setEnfermedad(idVacuna.enfermedad);
            setEstadoOp(idVacuna.estado);
        } else if (mode === 'create') {
            setMascotaFk('');
            setFechaVacuna(null);
            setEnfermedad('');
            setEstadoOp('');
        }
    }, [mode, idVacuna]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                fk_id_mascota: mascotaFK,
                fecha_vacuna: fechaVacuna ? fechaVacuna.toString() : '',
                enfermedad,
                estado: estadoOp
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
                <div className="py-2">
                    <select
                        className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        name="id_mascota"
                        value={mascotaFK}
                        onChange={(e) => setMascotaFk(e.target.value)}
                        required={true}
                    >
                        <option value="" hidden className="text-gray-600">
                            Seleccionar Mascota
                        </option>
                        {mascotas.map(masco => (
                            <option key={masco.id_mascota} value={masco.id_mascota}>
                                {masco.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='py-2'>
                    <DatePicker
                        label="Fecha de la vacuna"
                        maxValue={today(getLocalTimeZone())}
                        value={fechaVacuna}
                        className='w-80'
                        onChange={(date) => setFechaVacuna(date)}
                        required
                    />
                </div>
                <div className='py-2'>
                    <Input
                        className='w-80'
                        type="text"
                        label='Ingrese la enfermedad'
                        id='enfermedad'
                        name="enfermedad"
                        value={enfermedad}
                        onChange={(e) => setEnfermedad(e.target.value)}
                        required
                        pattern="^[a-zA-Z\s]{1,20}$"
                        title="El nombre de la enfermedad debe tener máximo 20 caracteres, y solo puede contener letras y espacios"
                    />
                </div>
                <div className="py-2">
                    <select
                        className="pl-2 pr-4 py-2 w-11/12 h-14 text-sm border-2 rounded-xl border-gray-200 hover:border-gray-400 shadow-sm text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        value={estadoOp}
                        onChange={(e) => setEstadoOp(e.target.value)}
                        required
                    >
                        <option value="" disabled hidden>
                            Seleccionar estado de la vacuna
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
                    <Button type="submit" color="warning" className='text-white p-2'>
                        {actionLabel}
                    </Button>
                </ModalFooter>
            </div>
        </form>
    );
};

export default FormVacunas;
