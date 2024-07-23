import React, { useRef, useEffect, useState, useContext } from 'react';
import { ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "../nextUI/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../nextUI/EyeSlashFilledIcon.jsx";
import UsuariosContext from '../../context/UsuariosContext.jsx';

export const FormUsuarios = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {
//useRef se usa para acceder a los elementos del formulario.
  const identificacionRef = useRef(null);
  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const correoRef = useRef(null);
  const passwordRef = useRef(null);
  const rolRef = useRef([]);
  
//useState se usa para gestionar el estado de los campos del formulario.
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('Empleado');
  
  //useContext se usa para acceder al contexto del usuario.
  const { idUsuario } = useContext(UsuariosContext);

  //useEffect:Se utiliza para inicializar el formulario con los datos del usuario si el modo es 'update' y hay un usuario seleccionado. Si el modo es 'create', se inicializan los campos en blanco.
  useEffect(() => {
    if (mode === 'update' && idUsuario) {
      setIdentificacion(idUsuario.identificacion);
      setNombre(idUsuario.nombre);
      setApellido(idUsuario.apellido);
      setCorreo(idUsuario.correo);
      setPassword(idUsuario.password);
      setRol(idUsuario.rol);
    } else {
      setIdentificacion('');
      setNombre('');
      setApellido('');
      setCorreo('');
      setPassword('');
      setRol('Empleado');
    }
  }, [mode, idUsuario]);

  //handleFormSubmit: Se encarga de manejar el envío del formulario. Recolecta los datos del formulario 
  //y los pasa a la función handleSubmit.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        identificacion: identificacionRef.current.value,
        nombre: nombreRef.current.value,
        apellido: apellidoRef.current.value,
        correo: correoRef.current.value,
        password: passwordRef.current.value,
        rol: rolRef.current.value
      };
      handleSubmit(formData, e);
    } catch (error) {
      console.log(error);
      alert('Hay un error en el sistema ' + error);
    }
  };
//isVisible controla si la contraseña es visible o no.
  const [isVisible, setIsVisible] = useState(false);
//toggleVisibility cambia el estado de visibilidad de la contraseña.

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form method='post' onSubmit={handleFormSubmit}>
      <div className='ml-5 align-items-center'>
        <div className='py-2'>
          <Input
            type="number"
            label="Identificación"
            className="max-w-xs"
            id='identificacion'
            name="identificacion"
            ref={identificacionRef}
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            type="text"
            label="Nombre"
            className="max-w-xs"
            id='nombre'
            name="nombre"
            ref={nombreRef}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            type="text"
            label="Apellido"
            className="max-w-xs"
            id='apellido'
            name="apellido"
            ref={apellidoRef}
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            type="text"
            label="Correo Electrónico"
            className="max-w-xs"
            id='correo'
            name="correo"
            ref={correoRef}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required={true}
          />
        </div>
        <div className='py-2'>
          <Input
            label="Contraseña"
            ref={passwordRef}
            name="password"
            id="password"
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none mb-2" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 py-2">
          <Select
            variant="bordered"
            label="Empleado"
            className="max-w-xs"
            isDisabled
          >
          </Select>

        </div>



      </div>
      <ModalFooter>
        <Button
          color='danger'
          variant='flat'
          onPress={onClose}
        >
          Cerrar
        </Button>
        <Button
          type='submit' className='text-white bg-[#006000]'
        >
          {actionLabel}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default FormUsuarios;
