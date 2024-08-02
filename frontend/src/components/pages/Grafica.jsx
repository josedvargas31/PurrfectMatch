import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ListGraficaModal from "../templates/GraficaModal";
import { Link } from '@nextui-org/react';
import iconos from '../../styles/iconos';
import Icon from '../atomos/IconVolver';
import Swal from 'sweetalert2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Graficas = () => {
    
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            label: 'Mascotas por Estado',
            data: [],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/mascota/conteo/estado');
                if (Array.isArray(response.data) && response.data.every(item => item.estado && item.total)) {
                    const estados = response.data.map(item => item.estado);
                    const totales = response.data.map(item => item.total);

                    setData({
                        labels: estados,
                        datasets: [{
                            label: 'Mascotas por Estado',
                            data: totales,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        }],
                    });
                } else {
                    throw new Error('La respuesta de la API no tiene el formato esperado');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
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
                        <Link href="/mascotas" color="default" className="mx-2 text-lg cursor-pointer">Registrar</Link>
                        <Link href="/notificaciones" color="default" className="mx-2 text-lg cursor-pointer">Notificaciones</Link>
                        <Link href="/graficas" color="default" className="mx-2 text-lg cursor-pointer">Graficas</Link>
                    </nav>
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
                </header>
            </div>
            <div className="p-4">
                <ListGraficaModal>
                    <div className="w-full max-w-4xl mx-auto">
                        {loading ? <p>Cargando...</p> : <Bar data={data} options={options} style={{ height: '500px' }} />}
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </ListGraficaModal>
            </div>
        </>
    );
};

export default Graficas;
