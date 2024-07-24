import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from "@nextui-org/link";
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
import { SearchIcon } from "../nextUI/SearchIcon.jsx";
import { ChevronDownIcon } from "../nextUI/ChevronDownIcon.jsx";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import ListMascotaModal from '../templates/ListsMascotaModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import { Tooltip } from "@nextui-org/react";

export function ListsMascotas() {

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

    function Ejemplo() {
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
                <Card className="p-4 m-4 shadow-lg">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-xl mb-1">{mascota.nombre}</h4>
                        <small className="text-default-500 mb-2">{mascota.genero}</small>
                        <h4 className="font-bold text-lg mb-2">{mascota.raza}</h4>
                        <Chip className="capitalize" color={statusColorMap[mascota.estado]} size="sm" variant="flat">
                            {mascota.estado}
                        </Chip>
                    </CardHeader>
                    <CardBody className="py-4">
                        <div className="relative w-full h-52 mb-4 overflow-hidden">
                            <Image
                                alt="Card background"
                                className="object-cover w-full h-full"
                                src={mascota.img ? `${axiosClient.defaults.baseURL}/uploads/${mascota.img}` : "https://nextui.org/images/hero-card-complete.jpeg"}
                            /*  layout="fill" */
                            /* objectFit="cover" */
                            />
                        </div>
                        <p className="text-tiny uppercase font-bold mb-4">{mascota.descripcion}</p>
                        <div className="flex justify-start gap-2">
                            <Link className='text-blue-500 underline' to='#' onClick={() => handleToggle('view', mascota)}>
                                Ver más
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            );
        }, []);

        return (
            <div className="flex flex-col items-center p-4 w-full">
                <div className="w-full sm:w-full lg:w-12/12 xl:w-11/12">
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
                            </div>
                        </div>
                        <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4">
                            {filteredItems.map(renderCard)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modalAcciones, setModalAcciones] = useState(false);
    const [mode, setMode] = useState('view');
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

    const handleToggle = (mode, initialData) => {
        setInitialData(initialData)
        setModalOpen(true)
        setMode(mode)
    }

    const handleModalClose = async () => {
        setModalOpen(false);
        peticionGet();  // Actualiza los datos de las mascotas después de cerrar el modal
    };

    return (
        <>
            <div className="flex flex-col items-center p-4 w-full">
                <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-10 h-14 bg-white shadow-md">
                    <h1 className="text-3xl font-semibold">Perrfect Match</h1>
                    <nav className="flex-grow flex justify-center space-x-24">
                        <Link  color="warning" className="mx-2 text-lg cursor-pointer">Listas de mascotas</Link>
                    </nav>
                    <Link href="/perfil" color="warning" className="mx-2 text-lg cursor-pointer">Perfil</Link>
                </header>
            </div>
            <div className='w-full max-w-screen-xl mx-auto p-4 sm:p-11 xl:w-11/12 lg:p-8'>
                <AccionesModal
                    isOpen={modalAcciones}
                    onClose={() => handleModalClose(false)}
                    label={mensaje}
                />
                <ListMascotaModal
                    open={modalOpen}
                    onClose={handleModalClose}  // Utiliza la nueva función de cierre
                    title='Mascota'
                    actionLabel='Cerrar'
                    initialData={initialData}
                    handleSubmit={handleModalClose}  // Utiliza la nueva función de cierre
                    mode={mode}
                />
                <Ejemplo
                    mascotas={mascotas}
                />
            </div>
        </>
    );
}