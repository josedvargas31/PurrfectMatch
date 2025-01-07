import React from 'react';
import FormMascotas from '../moleculas/FormMascota';
import { ModalAcciones } from '../organismos/ModalMascota';

function MascotaModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <FormMascotas initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
            </ModalAcciones>

        </>
    )
}
export default MascotaModal