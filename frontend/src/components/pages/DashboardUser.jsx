// DashboardAdmi.jsx
import React from 'react';
// Asegúrate de que la ruta sea correcta
/* import Header from '../organismos/header/Header';
import iconos from '../../styles/iconos'; */

function DashboardUser() {
   /*  const [sidebarAbierto, setSidebarAbierto] = useState(false);
    const usoRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarAbierto(!sidebarAbierto);
    };

    const scrollUso = () => {
        usoRef.current.scrollIntoView({ behavior: 'smooth' });
    }; */
    return (
        <div>
            <div className='bg-slate-700'>Hola Usi </div>
        </div>
        /* <>
            <div className={`contenidos : '60px' ${sidebarAbierto ? 'contenido-extendidos' : ''}`}>
                <Header toggleSidebar={toggleSidebar} sidebarAbierto={sidebarAbierto} />
                <div className='bg-cover bg-center' style={{ backgroundImage: `url(${iconos.Image1})`, height: '800px', backgroundRepeat: 'no-repeat' }}>
                    <div className='flex items-center'>
                        <div className='ml-28'>
                            <h3 className='text-custom-white pt-80 text-2xl'>Plataforma diseñada para agricultores</h3>
                            <h1 className='text-custom-white text-6xl'>CROP LINK</h1>
                            <h2 className='text-custom-white text-3xl text-justify mr-40'>
                                Una plataforma innovadora y accesible que transforma la gestión de cultivos y fincas. Pensada para optimizar la productividad y la rentabilidad de los usuarios, esta herramienta es tu aliado en la toma de decisiones informadas para el éxito de tus cultivos.
                            </h2>
                            <button onClick={scrollUso} className='inline-block mt-3 w-28 h-11 bg-green text-xl text-custom-white rounded-lg cursor-pointer transition duration-500 ease-in-out hover:bg-transparent hover:border-white hover:translate-x-1 hover:font-medium hover:focus:outline-none hover:border-2'>
                                Ver más
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center' style={{ height: '900px' }} ref={usoRef}>
                    <h1 className='text-4xl text-center text-green bold mt-28 mb-10'>¿Como Utilizar CropLink?</h1>
                    <div className='flex justify-center items-center text-justify mx-20'>
                        <p className='text-xl'>
                            ¡Bienvenido a CropLink! Sigue estos sencillos pasos para empezar a gestionar tus campos de manera eficiente. Abre la aplicación, inicia sesión, selecciona tu campo, agrega nuevas tareas y configura los detalles. ¡Es así de fácil! Mejora la productividad de tus cultivos con CropLink.
                        </p>
                    </div>
                </div>
            </div>
        </> */
    );
}

export default DashboardUser;
