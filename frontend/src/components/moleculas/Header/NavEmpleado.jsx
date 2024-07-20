import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importar Link y useLocation desde react-router-dom
import Icon from '../../atomos/Navbar/IconosNavbar';
import v from '../../../styles/variables';

function NavbarHeaderEmpleado({ toggleSidebar, sidebarAbierto}) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const vistaActual = location.pathname.split('/').filter(Boolean).pop() || 'Inicio'; // Obtener el último segmento de la ruta como nombre de la vista actual

  const navbarWidth = sidebarAbierto ? 'calc(100% - 220px)' : 'calc(100% - 60px)'; // Ajustar el ancho del navbar según el estado del sidebar

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    };

    setUser(getUserFromLocalStorage());

    // Listener para actualizar el usuario cuando cambie el localStorage
    const handleStorageChange = () => {
      setUser(getUserFromLocalStorage());
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup del listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className={`w-full top-0 fixed items-center h-12 bg-green transition-margin-left duration-600`} style={{ marginLeft: sidebarAbierto ? '' : '', width: navbarWidth, zIndex: 100 }}>
        <div className="mt-1 flex items-center justify-between">
          <div className="w-1/7 text-left">
            <div className={`text-custom-white relative z-1 ${sidebarAbierto ? '' : 'transform rotate-180'}`} onClick={toggleSidebar}>
              <Icon icon={v.iconoFlechaDerecha} />
            </div>
          </div>
          <div className="text-center">
            <h3 className='text-3xl ml-40 text-custom-white'>{vistaActual}</h3>
          </div>
          <div className="w-1/5 ">
            <div className='items-center flex content-center'>
              {/* Utiliza Link para redirigir a la nueva vista al hacer clic en el icono de perfil */}
              <Link to="/PerfilEmpleado" className="flex items-center">
                <Icon icon={v.iconoPerfilUsuario} />
                <div>
                  <h2 className="text-custom-white ml-3 font-bold">{user?.nombre}</h2>
                  <h2 className="text-custom-white ml-3">{user?.rol}</h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Elimina el componente Perfil y maneja la navegación en tu componente principal */}
    </>
  );
}

export default NavbarHeaderEmpleado;
