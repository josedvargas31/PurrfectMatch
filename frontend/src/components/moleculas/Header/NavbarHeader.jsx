import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importar Link y useLocation desde react-router-dom
import Icon from '../../atomos/Navbar/IconosNavbar';
import v from '../../../styles/variables';

function NavbarHeader({ toggleSidebar, sidebarAbierto }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const vistaActual = location.pathname.split('/').filter(Boolean).pop() || 'Inicio'; // Obtener el último segmento de la ruta como nombre de la vista actual

  const navbarWidth = sidebarAbierto ? 'calc(100% - 220px)' : 'calc(100% - 60px)'; // Ajustar el ancho del navbar según el estado del sidebar

  useEffect(() => {
    // Función para obtener el usuario del localStorage
    const getUserFromLocalStorage = () => {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    };

    // Inicializar el usuario
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
     <div className={`w-full top-0 fixed h-12 bg-green transition-margin-left duration-600 flex items-center`} style={{ marginLeft: sidebarAbierto ? '' : '', width: navbarWidth, zIndex: 100 }}>
    <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center w-1/7">
            <div className={`text-custom-white relative z-1 ${sidebarAbierto ? '' : 'transform rotate-180'}`} onClick={toggleSidebar}>
                <Icon icon={v.iconoFlechaDerecha} />
            </div>
        </div>
        <div className="flex-grow text-center">
            <h3 className="text-3xl text-custom-white ml-60">{vistaActual}</h3>
        </div>
        <div className="flex items-center w-1/5 justify-end mr-10">
            <Link to="/perfil" className="flex items-center">
                <Icon icon={v.iconoPerfilUsuario} />
                <div className="ml-3">
                    <h2 className="text-custom-white font-bold">{user?.nombre}</h2>
                    <h2 className="text-custom-white">{user?.rol}</h2>
                </div>
            </Link>
        </div>
    </div>
</div>
    </>
  );
}

export default NavbarHeader;
