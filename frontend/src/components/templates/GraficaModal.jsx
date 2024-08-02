import React from 'react';

function ListGraficaModal({ children }) {
    return (
        <div className="max-w-full p-6 border border-gray-300 rounded-lg shadow-lg">
            <div className="mb-4">
                <h3 className="text-xl font-semibold">Gráfica de Mascotas</h3>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default ListGraficaModal;
