import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Image, Chip, ModalFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import axiosClient from '../axiosClient';
import MascotasContext from '../../context/MascotasContext';
import Swal from 'sweetalert2';

function ListMascota({ initialData, onClose }) {
    const { mascotas, setMascotas } = useContext(MascotasContext);
    const [vacunas, setVacunas] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchVacunas = async () => {
            try {
                const response = await axiosClient.get(`/vacuna/listar/${initialData.id_mascota}`);
                setVacunas(response.data.data);
            } catch (error) {
                console.error('Error al listar vacunas:', error);
            }
        };

        fetchVacunas();
    }, [initialData.id_mascota]);

    const handleAdoptar = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario del localStorage
        const id_usuario = user ? user.id_usuario : null; // Asegúrate de que el ID del usuario esté disponible
    
        try {
            const response = await axiosClient.post(`/mascota/iniciar/${initialData.id_mascota}`, { id_usuario });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Mascota puesta en proceso de adopción',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                setMascotas();
                setModalOpen(false);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al poner en proceso de adopción',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error al iniciar adopción:', error);
            Swal.fire({
                title: 'Error',
                text: 'Error al poner en proceso de adopción',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (!initialData) {
        return <div>No se encontró la initialData.</div>;
    }

    const statusColorMap = {
        adoptar: "success",
        adoptada: "default",
        'proceso adopcion': "warning",
        todos: "primary",
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0'); // Asegura que el día tenga dos dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados, por lo que sumamos 1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    

    return (
        <>
            <Card className="py-2 bg-gray-200">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Nombre: {initialData.nombre}</h4>
                    <small className="text-default-500">Sexo: {initialData.genero}</small>
                    <h4 className="font-bold text-large">Raza: {initialData.raza}</h4>
                    <small className="text-default-500">Especie: {initialData.especie}</small>
                    <h4 className="font-bold text-large">Edad: {initialData.edad}</h4>
                    <h4 className="font-bold text-large">Esteralizacion: {initialData.esterilizacion}</h4>
                    <Chip className="capitalize" color={statusColorMap[initialData.estado]} size="xs" variant="flat">
                        {initialData.estado}
                    </Chip>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <div className="relative w-full h-52 mb-4 overflow-hidden">
                        <Image
                            alt="Card background"
                            className="object-cover w-full h-full"
                            src={initialData.img ? `${axiosClient.defaults.baseURL}/uploads/${initialData.img}` : "https://nextui.org/images/hero-card-complete.jpeg"}
                        />
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-4">{initialData.descripcion}</p>
                    <p className="text-sm text-gray-700 font-medium mb-4">Edad: {initialData.edad} años</p>
                    <div className="mt-2 flex flex-wrap justify-between">
                        {vacunas.map((vacuna, index) => (
                            <div
                                key={vacuna.id_vacuna}
                                className="mb-4 w-1/2 px-2"
                            >
                                <div className="border p-4 rounded">
                                    <h5 className="font-bold">Enfermedad: {vacuna.enfermedad}</h5>
                                    <p>Fecha: {formatDate(vacuna.fecha_vacuna)}</p>
                                    <p>Estado: {vacuna.estado}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </CardBody>
            </Card>
            <ModalFooter>
                <Button color="danger" onClick={onClose}>Cancelar</Button>
                <Button color="warning" className="z-1 text-white" onClick={handleAdoptar}>
                    ¡Adoptame!
                </Button>
            </ModalFooter>
        </>
    );
}

export default ListMascota;
