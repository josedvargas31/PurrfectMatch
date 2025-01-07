import React, { useEffect, useState } from 'react';
import iconos from '../../styles/iconos';
import Icon from '../atomos/IconVolver';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ButtonActualizar from '../atomos/ButtonActualizar';
import AccionesModal from '../organismos/ModalAcciones';
import PerfilModal from '../templates/PerfilModal';
import { Tooltip, Card, Button, Link } from "@nextui-org/react";
import axiosClient from '../axiosClient';

const PerfilUsuario = () => {

  const [perfil, setPerfil] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAcciones, setModalAcciones] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mode, setMode] = useState('create');

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const ObtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      const getURL = "http://localhost:3000/usuario/perfil";
      const response = await axiosClient.get(getURL, { headers: { token: token } });
      console.log(response.data);
      setPerfil(response.data.data);
    } catch (error) {
      console.error("Error al obtener la información", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);

    try {
      const id_usuario = JSON.parse(localStorage.getItem('user'));

      if (mode === 'update') {
        console.log(id_usuario);
        await axiosClient.put(`/usuario/perfilactualizar/${id_usuario.identificacion}`, formData).then((response) => {
          console.log(response);
          if (response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se actualizó con éxito la información",
              showConfirmButton: false,
              timer: 1500
            });
            ObtenerDatos();
          } else {
            alert('Error al actualizar');
          }
        });
      }
      setModalOpen(false);
    } catch (error) {
      console.log('Error en el servidor ', error);
      alert('Error en el servidor');
    }
  };

  const handleToggle = (mode, initialData) => {
    setInitialData(initialData);
    setModalOpen(true);
    setMode(mode);
  };

  return (
    <>
      <div className="flex flex-col items-center p-8 w-full">
        <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-10 h-14 bg-zinc-300 shadow-md max-w-screen-xxl flex-wrap mx-auto p-4">
          <h1 className="text-3xl font-semibold text-blue-400">Perrfect Match</h1>
          <nav className="flex-grow flex justify-center space-x-24">
            <Link href="/listmascotas" color="default" className="mx-2 text-lg cursor-pointer">Listas de mascotas</Link>
          </nav>
          <Link href="/perfil" color="black" className="mx-2 text-lg cursor-pointer">Perfil</Link>
        </header>
      </div>
      {perfil && (
        <div className='my-12 flex justify-center'>
          <Card css={{ maxWidth: "1100px" }} className="bg-white rounded-2xl">
            <div className="p-10">
              <div className="flex flex-col items-start">
                <h4 className="mb-4 text-3xl font-semibold">{perfil.nombres} {perfil.apellidos}</h4>
                <div className="flex items-center mb-4">
                  <Button auto flat color="warning" onClick={() => handleToggle('update', perfil)}>
                    Actualizar
                  </Button>
                </div>
                <div className="flex items-center">
                  <Tooltip content="Salir">
                    <Button auto flat color="error" onClick={() => {
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
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <div className="my-4 border-b-2 border-gray-300" />
              <h6 className="text-xl font-semibold">Información del Usuario:</h6>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="font-medium text-lg">Identificación:</label>
                  <p>{perfil.identificacion}</p>
                </div>
                <div>
                  <label className="font-medium text-lg">Nombres:</label>
                  <p>{perfil.nombres}</p>
                </div>
                <div>
                  <label className="font-medium text-lg">Apellidos:</label>
                  <p>{perfil.apellidos}</p>
                </div>
                <div>
                  <label className="font-medium text-lg">Correo Electrónico:</label>
                  <p>{perfil.correo}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <AccionesModal
        isOpen={modalAcciones}
        onClose={() => setModalAcciones(false)}
        label={mensaje}
      />
      <PerfilModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={mode === 'update' ? 'Actualizar Información de Usuario' : ' Actualizar Perfil'}
        actionLabel={mode === 'update' ? 'Actualizar' : 'Actualizar'}
        initialData={initialData}
        handleSubmit={handleSubmit}
        mode={mode}
      />
    </>
  );
};

export default PerfilUsuario;
