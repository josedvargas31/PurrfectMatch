import React, { createContext } from 'react'
import { MascotasProvider } from './MascotasContext'
import { VacunasProvider } from './VacunasContext'
import { UsuariosProvider } from './UsuariosContext'

// import { AuthProvider } from './authContext.jsx'


export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const globalContextValue = {}

    return (
        <GlobalContext.Provider value={globalContextValue}>
            <MascotasProvider>
                <VacunasProvider>
                    <UsuariosProvider>
                        {children}
                    </UsuariosProvider>
                </VacunasProvider>
            </MascotasProvider>
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
