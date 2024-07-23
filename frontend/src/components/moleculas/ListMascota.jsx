import React, { useContext, useEffect } from 'react';
import { Card, CardHeader, CardBody, Image, Chip, ModalFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import axiosClient from '../axiosClient';
import MascotasContext from '../../context/MascotasContext';
import Swal from 'sweetalert2';

function ListMascota({ initialData, onClose }) {
    const { mascotas, setMascotas } = useContext(MascotasContext);
    const [modalOpen, setModalOpen] = React.useState(false);

    useEffect(() => {
        setMascotas()
    }, []);

    const handleAdoptar = async () => {
        try {
            const response = await axiosClient.post(`/mascota/iniciar/${initialData.id_mascota}`);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Mascota puesta en proceso de adopción',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                setMascotas()
                setModalOpen(false)
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

    return (
        <>
        <Card className="py-2">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{initialData.nombre}</h4>
                <small className="text-default-500">{initialData.genero}</small>
                <h4 className="font-bold text-large">{initialData.raza}</h4>
                <Chip className="capitalize" color={statusColorMap[initialData.estado]} size="xs" variant="flat">
                    {initialData.estado}
                </Chip>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className="relative w-full h-72 mb-4 overflow-hidden">
                    <Image
                        alt="Card background"
                        className="object-cover w-full h-full"
                        src={initialData.img ? `${axiosClient.defaults.baseURL}/uploads/${initialData.img}` : "https://nextui.org/images/hero-card-complete.jpeg"}
                    />
                </div>
                <p className="text-tiny uppercase font-bold mt-2">{initialData.descripcion}</p>
                <p className="text-tiny uppercase font-bold mt-1">Edad: {initialData.edad} años</p>
                <div className="mt-2 flex justify-center">
             
                </div>
            </CardBody>
            
        </Card>
           <ModalFooter>
           <Button color="danger" onClick={onClose}>Cancelar</Button>
           <Button color="warning" className="z-1 text-white" onClick={handleAdoptar}>
               Adoptame!
           </Button>
       </ModalFooter>
       </>
    );
}

export default ListMascota;
