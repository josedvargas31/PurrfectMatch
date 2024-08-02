import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';
import Swal from 'sweetalert2';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/button';

const FormPerfil = () => {
  const [perfil, setPerfil] = useState(null);

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');

  const [identificacion, setIdentificacion] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = localStorage.getItem('token');
        const getURL = 'http://localhost:3000/usuario/perfil';
        const response = await axiosClient.get(getURL, { headers: { Authorization: `Bearer ${token}` } });
        console.log('Datos obtenidos:', response.data);
        setPerfil(response.data.data);
        setNombres(response.data.data.nombres);
        setIdentificacion(response.data.data.identificacion); // Asegúrate de que sea identificacion
        setApellidos(response.data.data.apellidos);
        setCorreo(response.data.data.correo);
      } catch (error) {
        console.error('Error al obtener la información', error.response ? error.response.data : error.message);
      }
    };

    obtenerDatos();
  }, []);

  const actualizarPerfil = async (e) => {
    e.preventDefault();
    if (!perfil) return;

    console.log('Datos a enviar:', { nombres, apellidos, correo });

    try {
      const token = localStorage.getItem('token');
      const response = await axiosClient.put(
        `http://localhost:3000/usuario/perfilactualizar/${identificacion}`,
        { nombres, apellidos, correo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Respuesta de actualización:', response.data);

      if (response.status === 200) {
        Swal.fire('¡Información actualizada!', 'Tu información ha sido actualizada correctamente.', 'success');
        setPerfil(prev => ({ ...prev, nombres, apellidos, correo }));
      }
    } catch (error) {
      console.error('Error al actualizar la información:', error.response ? error.response.data : error.message);
      Swal.fire('¡Error!', 'Hubo un problema al actualizar tu perfil. Inténtalo de nuevo más tarde.', 'error');
    }
  };

  if (!perfil) return null;

  return (
    <div>
      <form onSubmit={actualizarPerfil}>
        <div>
          <label>Nombres:</label>
          <Input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </div>
        <div>
          <label>Apellidos:</label>
          <Input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <Input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button type='submit' color="success">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormPerfil;
