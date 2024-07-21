import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'


const VacunasContext = createContext()

export const VacunasProvider = ({ children }) => {

    const [vacunas, setVacunas] = useState([])
    const [vacuna, setVacuna] = useState([])
    const [idVacuna, setVacunaId] = useState([])

    const getVacunas = () => {
        try {
            axiosClient.get('/vacuna/listar').then((response) => {
                console.log(response.data)
                setVacunas(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getVacuna = (id_vacuna) => {
        try {
            axiosClient.get(`/vacuna/buscar/${id_vacuna}`).then((response) => {
                console.log(response.data)
                setVacuna(response.data)
            })
        } catch (error) {
            console.log('Error' + error);
        }
    }
    return (
        <VacunasContext.Provider
            value={{
                vacunas,
                vacuna,
                idVacuna,
                setVacunas,
                setVacuna,
                setVacunaId,
                getVacunas,
                getVacuna
            }}
        >
            {children}
        </VacunasContext.Provider>
    )
}

export default VacunasContext;
