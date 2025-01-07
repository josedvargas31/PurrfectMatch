import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from "@nextui-org/link";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
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
import { Card, CardHeader, CardBody, Image, Skeleton } from "@nextui-org/react";
import ListMascotaModal from '../templates/ListsMascotaModal.jsx';
import AccionesModal from '../organismos/ModalAcciones.jsx';
import iconos from '../../styles/iconos';
import Icon from '../atomos/IconVolver';
import { Tooltip } from "@nextui-org/react";


export function ListsMascotas() {
    const navigate = useNavigate();
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
        const [isLoaded, setIsLoaded] = useState(false);

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

        useEffect(() => {
            // Simulate fetching data with a delay
            setTimeout(() => {
                setIsLoaded(true);
            }, 1500);
        }, []);

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
                <Card className="p-2 bg-gray-200">

                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-2xl mb-1 text-gray-800">Nombre: {mascota.nombre}</h4>
                        <small className="text-gray-600 mb-2">Género: {mascota.genero}</small>
                        <h4 className="font-semibold text-lg mb-2 text-gray-700">Raza: {mascota.raza}</h4>
                        <Chip className="capitalize" color={statusColorMap[mascota.estado]} size="sm" variant="flat">
                            {mascota.estado}
                        </Chip>
                    </CardHeader>
                    <CardBody className="overflow-visible py-4">
                        <Skeleton isLoaded={isLoaded} className="rounded-lg">
                            <div className="relative w-full mb-4 overflow-hidden">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl w-full h-full"
                                    src={mascota.img ? `${axiosClient.defaults.baseURL}/uploads/${mascota.img}` : "https://nextui.org/images/hero-card-complete.jpeg"}
                                    width='auto'
                                    height='auto'
                                />
                            </div>
                        </Skeleton>
                        <p className="text-sm text-gray-700 font-medium mb-4">{mascota.descripcion}</p>
                        <div className="flex justify-start gap-2">
                            <Link className='text-blue-600 underline cursor-pointer font-semibold' to='#' onClick={() => handleToggle('view', mascota)}>
                                Ver más
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            );
        }, [isLoaded]);

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
                            <div className="z-0 flex gap-3">
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
                        <div className="z-0 grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        console.log('holap cerrar');
        setModalOpen(false);
        peticionGet();  // Actualiza los datos de las mascotas después de cerrar el modal
    };
    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <div className="flex flex-col items-center p-8 w-full">
                <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-10 h-14 bg-zinc-300 shadow-md max-w-screen-xxl flex-wrap mx-auto p-4">
                    <h1 className="text-3xl font-semibold text-blue-400">Perrfect Match</h1>
                    <nav className="flex-grow flex justify-center space-x-24">
                        <Link color="default" className="mx-2 text-lg cursor-pointer">Listas de mascotas</Link>
                    </nav>
                    <Tooltip content="Salir">
                        <div className="text-black shadow-xl flex items-center py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-green hover:text-white cursor-pointer" onClick={() => {
                            const swalWithBootstrapButtons = Swal.mixin({
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                    actions: "gap-5"
                                },
                                buttonsStyling: false
                            });

                            swalWithBootstrapButtons.fire({
                                title: "¿Estás Seguro que deseas Cerrar Sesión?",
                                text: "",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Salir",
                                cancelButtonText: "Cancelar",
                                reverseButtons: true
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    logout();
                                }
                            });
                        }}>
                            <Icon className="w-5 h-5" icon={iconos.iconoSalir} />
                        </div>
                    </Tooltip>
                </header>
            </div>
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
        </>
    );
}
