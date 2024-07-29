import React, { createContext, useState } from 'react'
//Archivo axiosClient es una instancia de Axios configurada previamente para hacer peticiones HTTP.
import axiosClient from '../components/axiosClient'
/* import axios from 'axios' */

//creando el contexto
const UsuariosContext = createContext()

export const UsuariosProvider = ({ children }) => {
//usuarios: Lista de usuarios.
//usuario: Datos de un usuario específico.
//idUsuario: Identificador del usuario.
    const [usuarios, setUsuarios] = useState([])
    const [usuario, setUsuario] = useState([])
    const [idUsuario, setUsuarioId] = useState([])


    //getUsuarios: Realiza una solicitud para obtener todos los usuarios y actualiza el estado usuarios.
    const getUsuarios = () => {
        try {
            axiosClient.get('/usuario/listar').then((response) => {
                console.log(response.data)
                setUsuarios(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    //getUsuario: Realiza una solicitud para obtener los datos de un usuario específico por su id_usuario y actualiza el estado usuario.
    const getUsuario = (id_usuario) => {
        try {
            axiosClient.get(`/usuario/buscar${id_usuario}`).then((response) => {
                console.log(response.data)
                setUsuario(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    //Se exporta todo lo que se utilizo
    <UsuariosContext.Provider
        value={{
            usuarios,
            usuario,
            idUsuario,
            setUsuarios,
            setUsuario,
            setUsuarioId,
            getUsuarios,
            getUsuario
        }}
    >
        {children}
    </UsuariosContext.Provider>
  )
}

export default UsuariosContext
