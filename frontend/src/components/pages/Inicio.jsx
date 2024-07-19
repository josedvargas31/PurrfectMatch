import React from 'react';
import { Link } from 'react-router-dom';
import imagenes from "../../styles/imagenes";

function Inicio() {
    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imagenes.imgPrincipalPets})` }}>
            <div className="absolute top-0 left-0 w-full h-24 text-white flex items-center justify-between py-1 px-4 z-10">
                <img src="../../path/to/logo.png" alt="logo" className="w-30 h-30" />
                <ul className="flex space-x-4">
                    <li>
                        <Link to='/registro'>
                            <button className="text-white border-3 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Registrarse
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/iniciosesion'>
                            <button className="mr-5 inline-block px-5 py-2.5 text-white font-semibold border-2 border-transparent rounded transition-transform hover:border-white hover:bg-transparent hover:text-white transform translate-x-2 text-center bg-[#F7B318]">
                                Iniciar Sesion
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-4xl px-5">
                    <h1 className="text-7xl text-white font-semibold mb-4">Bienvenidos a Purrfect Match</h1>
                    <p className="text-2xl text-white leading-tight">¡Bienvenido a Purrfect Match tu aliado en el mundo de la agricultura digital. Explora nuestras características y mejora tu rendimiento agrícola</p>
                </div>
            </div>
        </div>
    );
}

export default Inicio;

/* rfce */