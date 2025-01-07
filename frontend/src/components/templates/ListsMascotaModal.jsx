import React from 'react';
import { ModalAcciones } from '../organismos/Modal';
import ListMascota from '../moleculas/ListMascota';

function ListMascotaModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <ListMascota mode={mode} initialData={initialData} handleSubmit={handleSubmit} actionLabel={actionLabel} />
            </ModalAcciones>
        </>
    )
}

export default ListMascotaModal;
