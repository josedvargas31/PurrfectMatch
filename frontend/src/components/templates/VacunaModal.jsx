import React from 'react';
import { ModalAcciones } from '../organismos/Modal';
import FormVacunas from '../moleculas/FormVacuna';

function VacunaModal({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
    return (
        <>
            <ModalAcciones open={open} title={title} onClose={onClose} >
                <FormVacunas initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
            </ModalAcciones>
        </>
    );
}

export default VacunaModal;
