import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const MascotasContext = createContext()

export const MascotasProvider = ({ children }) => {

    const [mascotas, setMascotas] = useState([])
    const [mascota, setMascota] = useState([])
    const [idMascota, setMascotaId] = useState([])

    const getMascotas = () => {
        try {
            axiosClient.get('/mascota/listar').then((response) => {
                console.log(response.data)
                setMascotas(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getMascota = (id_mascota) => {
        try {
            axiosClient.get(`/mascota/buscar/${id_mascota}`).then((response) => {
                console.log(response.data)
                setMascota(response.data)
            })
        } catch (error) {
            console.log('Error' + error) ;
        }
    }
  return (
    <MascotasContext.Provider
        value={{
            mascotas,
            mascota,
            idMascota,
            setMascotas,
            setMascota,
            setMascotaId,
            getMascotas,
            getMascota
        }}
    >
        {children}
    </MascotasContext.Provider>
  )
}

export default MascotasContext
