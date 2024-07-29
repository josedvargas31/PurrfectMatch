import React, { useEffect, useState } from 'react';
import iconos from '../../styles/iconos';
import Icon from '../atomos/IconVolver';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ButtonActualizar from '../atomos/ButtonActualizar';
import AccionesModal from '../organismos/ModalAcciones';
import PerfilModal from '../templates/PerfilModal';
import { Tooltip } from "@nextui-org/react";
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

  const handleSubmit = async (formData, e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);

    try {
        const id_usuario = localStorage.getItem('id_usuario');

        if (mode === 'update' && identificacion) {
            await axiosClient.put(`http://localhost:3000/usuario/perfilactualizar/${id_usuario}`, formData).then((response) => {
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
      {perfil && (
        <div className='my-12 flex justify-center'>
          <div className='bg-white rounded-2xl' style={{ width: '1100px' }}>
            <div className='mt-10'>
              <span className='bg-green p-2 text-white'>{perfil.rol}</span>
            </div>
            <div className='flex justify-end px-10 my-3'>
              <span className='mt-4 mr-80 text-3xl font-semibold' style={{ display: 'flex', justifyContent: 'center', borderRadius: '10px' }}>{`${perfil.nombres} ${perfil.apellidos}`}</span>
              <div className='mr-5 ml-10 text-black shadow-xl flex items-center rounded-lg transition-colors duration-300 hover:bg-green hover:text-white cursor-pointer'>
                <ButtonActualizar onClick={() => handleToggle('update', perfil)} />
              </div>
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
            </div>
            <span className='ml-10 mr-60 text-xl font-semibold'>Información del Usuario:</span>
            <hr className='mx-8' />
            <ul className='mt-4 flex justify-between px-10'>
              <li className='my-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Identificación: </label>
                <br />
                <label>{perfil.identificacion}</label>
              </li>
              <li className='my-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Nombres: </label>
                <br />
                <label>{perfil.nombres}</label>
              </li>
              <li className='my-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Apellidos: </label>
                <br />
                <label>{perfil.apellidos}</label>
              </li>
              <li className='mt-3'>
                <label style={{ fontWeight: '500', fontSize: '19px' }}> Correo Electrónico: </label>
                <br />
                <label>{perfil.correo}</label>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className='ml-28 items-center p-10'>
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
      </div>
    </>
  );
};

export default PerfilUsuario;
