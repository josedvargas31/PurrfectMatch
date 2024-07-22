import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import MascotasContext from '../../context/MascotasContext.jsx';
import {
    Input,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { PlusIcon } from "../nextUI/PlusIcon.jsx";
import { SearchIcon } from "../nextUI/SearchIcon.jsx";
import { ChevronDownIcon } from "../nextUI/ChevronDownIcon.jsx";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import MascotaModal from '../templates/MascotaModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import ButtonDesactivar from "../atomos/ButtonDesactivar.jsx";
import ButtonActualizar from "../atomos/ButtonActualizar.jsx";

export function Mascotas() {


    const statusColorMap = {
        adoptar: "success",
        adoptada: "default",
        'proceso adopcion': "warning",
        todos: "primary",
    };

    const statusOptions = [
        { name: "Todos", uid: "todos" },
        { name: "Adoptar", uid: "adoptar" },
        { name: "Proceso Adopcion", uid: "proceso adopcion" },
        { name: "Adoptada", uid: "adoptada" },
    ];

    function Ejemplo({ mascotas }) {
        const [filterValue, setFilterValue] = useState("");
        const [selectedKeys, setSelectedKeys] = useState(new Set(["todos"]));
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [page, setPage] = useState(1);

        const statusFilter = useMemo(() => {
            return Array.from(selectedKeys).join(", ");
        }, [selectedKeys]);

        const hasSearchFilter = Boolean(filterValue);

        const filteredItems = useMemo(() => {
            let filteredMascotas = mascotas;

            if (hasSearchFilter) {
                filteredMascotas = filteredMascotas.filter(mascota =>
                    String(mascota.id_mascota).toLowerCase().includes(filterValue.toLowerCase()) ||
                    mascota.nombre.toLowerCase().includes(filterValue.toLowerCase()) ||
                    mascota.raza.toLowerCase().includes(filterValue.toLowerCase()) ||
                    mascota.genero.toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "todos") {
                filteredMascotas = filteredMascotas.filter(
                    (mascota) => mascota.estado === statusFilter
                );
            }

            return filteredMascotas;
        }, [mascotas, filterValue, statusFilter]);

        const onSearchChange = (e) => {
            setFilterValue(e.target.value);
        };

        const onClear = () => {
            setFilterValue('');
        };

        const onRowsPerPageChange = (e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(1);
        };

        const renderCard = useCallback((mascota) => {
            return (
                <Card className="py-2 " key={mascota.id_mascota}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">{mascota.nombre}</h4>
                        <small className="text-default-500">{mascota.genero}</small>
                        <h4 className="font-bold text-large">{mascota.raza}</h4>
                        <Chip className="capitalize" color={statusColorMap[mascota.estado]} size="xs" variant="flat">
                            {mascota.estado}
                        </Chip>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={mascota.img && "https://nextui.org/images/hero-card-complete.jpeg"}
                            width={570}
                        />
                          <p className="text-tiny uppercase font-bold">{mascota.descripcion}</p>
                        <div className="mt-2 flex justify-start gap-2">
                            <ButtonActualizar onClick={() => handleToggle('update', setMascotaId(mascota))} />
                            <ButtonDesactivar
                                onClick={() => peticionDesactivar(mascota.id_mascota)}
                                estado={mascota.estado}
                            />
                        </div>
                    </CardBody>
                </Card>
            );
        }, []);

        return (
            <div className="flex flex-col items-center p-4 w-full">
                <div className="w-full sm:w-full lg:w-11/12 xl:w-11/12">
                    <div className="flex flex-col mt-3">
                        <div className="flex justify-between gap-3 items-end">
                            <Input
                                isClearable
                                className="w-full sm:max-w-[44%] bg-[#f4f4f5] rounded"
                                placeholder="Buscar..."
                                startContent={<SearchIcon />}
                                value={filterValue}
                                onClear={onClear}
                                onChange={onSearchChange}
                            />
                            <div className="flex gap-3">
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize"
                                            endContent={<ChevronDownIcon className="text-small text-slate-700" />}
                                        >
                                            {statusFilter}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Single selection example"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={selectedKeys}
                                        onSelectionChange={setSelectedKeys}
                                    >
                                        {statusOptions.map((status) => (
                                            <DropdownItem key={status.uid} className="capitalize w-55">
                                                {status.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <Button color="warning" className="z-1 text-white" style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                       {/*  <div className="flex items-center justify-between mt-4">
                            <span className="text-default-400 text-small">Total {filteredItems.length} Resultados</span>
                            <label className="flex items-center text-default-400 text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-default-400 text-small"
                                    onChange={onRowsPerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </label>
                        </div> */}
                        <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredItems.map(renderCard)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('create');
    const [initialData, setInitialData] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const [mensaje, setMensaje] = useState('')
    const { idMascota, setMascotaId } = useContext(MascotasContext);

    useEffect(() => {
        peticionGet();
    }, []);

    const peticionGet = async () => {
        try {
            await axiosClient.get('/mascota/listar').then((response) => {
                console.log(response.data);
                setMascotas(response.data);
            });
        } catch (error) {
            console.log('Error en el servidor ' + error);
        }
    };

    /* const peticionDesactivar = async (id_mascota) => {
        try {
            const response = await axiosClient.put(`/desactivarMascota/${id_mascota}`, null);
            console.log(response.data);
            if (response.status === 200) {
                const nuevoEstado = response.data.message;
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Esto podrá afectar a tus mascotas!",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, estoy seguro!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: `${nuevoEstado}`,
                            icon: "success"
                        });
                        peticionGet();
                    } else {
                        Swal.fire({
                            title: "Cancelado",
                            text: "La operación ha sido cancelada",
                            icon: "info"
                        });
                    }
                });
            } else {
                alert('Error, el mensaje recibido no tiene el formato esperado');
            }
        } catch (error) {
            alert('Error del servidor ' + error);
        }
    }; */

    // registrar y actualizar mascota
    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault()

        try {

            if (mode === 'create') {
                await axiosClient.post('/mascota/registrar', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center", // Posición centrada
                            icon: "success",
                            title: "Mascota registrado con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error en el registro')
                    }
                })
            } else if (mode === 'update') {

                await axiosClient.put(`/mascota/actualizar/${idMascota.id_mascota}`, formData).then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se actualizó con éxito la mascota",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet()
                    } else {
                        alert('Error al actualizar')
                    }
                })
            }
            setModalOpen(false)

        } catch (error) {
            console.log('Error en el servidor ', error)
            alert('Error en el servidor')
        }
    }


    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }
    /*  */


    return (
        <>
         <div className='w-full max-w-screen-xl mx-auto p-4 sm:p-11 xl:w-11/12 lg:p-8'>
            <AccionesModal
                isOpen={modalAcciones}
                onClose={() => setModalAcciones(false)}
                label={mensaje}
            />
            <MascotaModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={mode === 'create' ? 'Registrar mascotas' : 'Actualizar mascotas'}
                actionLabel={mode === 'create' ? 'Registrar' : 'Actualizar'}
                initialData={initialData}
                handleSubmit={handleSubmit}
                mode={mode}
            />
            <Ejemplo
                mascotas={mascotas}
            />
        </div>
    </>
    
    );
}
