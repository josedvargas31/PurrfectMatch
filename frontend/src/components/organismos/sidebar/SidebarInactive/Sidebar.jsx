import React, { useState } from 'react'
import iconos from '../../../../styles/variables';
import Icon from '../../../atomos/Sidebar/IconosSidebar';
import Image from '../../../atomos/Logo';
import { Tooltip } from "@nextui-org/react"

function Sidebar() {

  const [bgColor, setBgColor] = useState('green');
  return (
    <div className={`bg-${bgColor} text-custom-white fixed top-0 left-0`} style={{ width: '60px', height: '100vh', position: 'fixed', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none', transition: 'width 0.6s' }} >
      <div className='mt-2 mb-5 ' style={{ 'justifyContent': 'center', 'display': 'flex' }}>
        <Image style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
      </div>
      <ul className="mavbar mt-5">
        
        <Tooltip content="Inicio">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Inicio"> <Icon icon={iconos.iconoInicio} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Empleados">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Usuario">
              <Icon icon={iconos.iconoUsuarios} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Finca">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Finca">
              <Icon icon={iconos.iconoFinca} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Actividad">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Actividad">
              <Icon icon={iconos.iconoActividad} />
            </a>
          </li>
        </Tooltip>
        
        <Tooltip content="Asignación">
          <li className={`rounded-full ml-3 mr-3 flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Asignacion">
              <Icon icon={iconos.iconoProgramacion} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Costos">
          <li className={`rounded-full ml-3 mr-3  flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="Costos">
              <Icon icon={iconos.iconoCostos} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Producción">
          <li className={`rounded-full ml-3 mr-3  flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Produccion">
              <Icon icon={iconos.iconoProduccion} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Estadísticas">
          <li className={`rounded-full ml-3 mr-3  flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Graficas">
              <Icon icon={iconos.iconoGrafica} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Mapa">
          <li className={`rounded-full ml-3 mr-3  flex items-center mb-4 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/mapa">
              <Icon icon={iconos.iconoMapa} />
            </a>
          </li>
        </Tooltip>

        <Tooltip content="Soporte">
          <li className={`rounded-full ml-3 mr-3  flex items-center mb-3 transition-colors duration-300 ${bgColor === 'green' ? 'bg-green text-custom-white hover:bg-custom-white hover:text-green' : 'bg-white text-green hover:bg-green hover:text-white'}`} style={{ width: '30px', height: '30px', justifyContent: 'center' }}>
            <a className={`nav-link no-underline ${bgColor === 'green' ? ' hover:text-green' : 'bg-green hover:text-green'}`} href="/Soporte">
              <Icon icon={iconos.iconoSoporte} />
            </a>
          </li>
        </Tooltip>

      </ul>
    </div>
  )
}

export default Sidebar;