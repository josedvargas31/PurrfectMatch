import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import MascotaModal from '../templates/MascotaModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import Swal from 'sweetalert2';
import axiosClient from '../axiosClient.js';
import MascotasContext from '../../context/MascotasContext.jsx';
import {
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip
} from "@nextui-org/react";
import { PlusIcon } from "../nextUI/PlusIcon.jsx";
import { SearchIcon } from "../nextUI/SearchIcon.jsx";
import { ChevronDownIcon } from "../nextUI/ChevronDownIcon.jsx";
import ButtonDesactivar from "../atomos/ButtonDesactivar.jsx";
import ButtonActualizar from "../atomos/ButtonActualizar.jsx";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export function Mascotas() {
    const statusColorMap = {
        activo: "success",
        inactivo: "danger",
        todos: "primary",
    };

    function Ejemplo() {
        const [filterValue, setFilterValue] = useState("");
        const [selectedKeys, setSelectedKeys] = useState(new Set([]));
        const [statusFilter, setStatusFilter] = useState("todos");
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const [sortDescriptor, setSortDescriptor] = useState({
            column: "fecha",
            direction: "ascending",
        });
        const [page, setPage] = useState(1);

        const statusOptions = [
            { name: "Todos", uid: "todos" },
            { name: "Activo", uid: "activo" },
            { name: "Inactivo", uid: "inactivo" },
        ];

        const hasSearchFilter = Boolean(filterValue);

        const filteredItems = useMemo(() => {
            let filteredmascotas = mascotas;

            if (hasSearchFilter) {
                filteredmascotas = filteredmascotas.filter(mascota =>
                    String(mascota.id_variedad).toLowerCase().includes(filterValue.toLowerCase()) ||
                    mascota.nombre_variedad.toLowerCase().includes(filterValue.toLowerCase()) ||
                    mascota.tipo_cultivo.toLowerCase().includes(filterValue.toLowerCase())
                );
            }

            if (statusFilter !== "todos") {
                filteredmascotas = filteredmascotas.filter(mascota =>
                    mascota.estado === statusFilter
                );
            }
            console.log('Filtered Items:', filteredmascotas);  // Agrega esto para verificar
            return filteredmascotas;
        }, [mascotas, filterValue, statusFilter]);

        const renderCard = useCallback((mascota) => {
            return (
                <Card className="py-4" key={mascota.id_variedad}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">mascota</p>
                        <h4 className="font-bold text-large">{mascota.nombre}</h4>
                        <h4 className="font-bold text-large">{mascota.raza}</h4>
                        {<Chip className="capitalize" color={statusColorMap[mascota.estado]} size="sm" variant="flat">
                            {mascota.estado}
                        </Chip>}
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                            width={270}
                        />
                        {<div className="mt-2 flex justify-start gap-2">
                            <ButtonActualizar onClick={() => handleToggle('update', mascota)} />
                            <ButtonDesactivar
                                onClick={() => peticionDesactivar(mascota.id_variedad)}
                                estado={mascota.estado}
                            />
                        </div>}
                    </CardBody>
                </Card>
            );
        }, [statusColorMap]);

        return (
            <div className="flex flex-col items-center p-4 w-full">
                <div className="w-full sm:w-full lg:w-11/12 xl:w-8/12">
                    <div className="flex flex-col mt-3">
                        <div className="flex justify-between gap-3 items-end">
                            <Input
                                isClearable
                                className="w-full sm:max-w-[44%] bg-[#f4f4f5] rounded"
                                placeholder="Buscar..."
                                startContent={<SearchIcon />}
                                value={filterValue}
                                onClear={() => onClear()}
                                onValueChange={onSearchChange}
                            />
                            <div className="flex gap-3">
                                <Dropdown>
                                    <DropdownTrigger className="hidden sm:flex mr-2 text-black bg-[#f4f4f5]">
                                        <Button endContent={<ChevronDownIcon className="text-small text-slate-700" />} variant="flat">
                                            Estado
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label="Menu de acciones"
                                        aria-labelledby="Acciones"
                                        closeOnSelect={false}
                                        selectedKeys={statusFilter}
                                        selectionMode="single"
                                        onSelectionChange={setStatusFilter}
                                    >
                                        {statusOptions.map((status) => (
                                            <DropdownItem key={status.uid} className="capitalize w-55">
                                                {status.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <Button className="z-1 text-white bg-[#006000]" style={{ position: 'relative' }} endContent={<PlusIcon />} onClick={() => handleToggle('create')}>
                                    Registrar
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-default-400 text-small">Total {filteredItems.length} Resultados</span>
                            <label className="flex items-center text-default-400 text-small">
                                Columnas por página:
                                <select
                                    className="bg-transparent outline-none text-default-400 text-small"
                                    onChange={onRowsPerPageChange}
                                >
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </label>
                        </div>
                        <div className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.isArray(filteredItems) ? filteredItems.map(renderCard) : <p>No hay mascotas disponibles.</p>}
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
    const [mensaje, setMensaje] = useState('');
    const [mascotas, setMascotas] = useState([]);

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

    const peticionDesactivar = async (id_variedad) => {
        try {
            const response = await axiosClient.put(`/desactivarvariedad/${id_variedad}`, null);
            console.log(response.data);
            if (response.status === 200) {
                const nuevoEstado = response.data.message;
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¡Esto podrá afectar a tus variedades!",
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
    };

    const handleSubmit = async (formData, e) => {
        console.log('Datos enviados:', formData);
        e.preventDefault();

        try {
            if (mode === 'create') {
                await axiosClient.post('/registrarVariedad', formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Variedad registrada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet();
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error en el registro",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            } else {
                await axiosClient.put(`/actualizarVariedad/${initialData.id_variedad}`, formData).then((response) => {
                    console.log('API Response:', response);
                    if (response.status == 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Variedad actualizada con éxito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        peticionGet();
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Error en la actualización",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error al registrar o actualizar variedad:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error en el servidor",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleToggle = (action, data) => {
        setMode(action);
        setInitialData(data || null);
        setModalOpen(!modalOpen);
    };

    const onSearchChange = (value) => {
        setFilterValue(value);
    };

    const onClear = () => {
        setFilterValue('');
    };

    const onRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
    };

    return (
        <>
            <Ejemplo />
            {modalOpen && <MascotaModal open={modalOpen} setOpen={setModalOpen} handleSubmit={handleSubmit} mode={mode} initialData={initialData} />}
            {modalAcciones && <AccionesModal open={modalAcciones} setOpen={setModalAcciones} idMascota={idMascota} />}
        </>
    );
}
