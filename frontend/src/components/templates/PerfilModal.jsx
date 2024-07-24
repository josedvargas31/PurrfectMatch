import React from 'react'
import FormPerfil from '../moleculas/FormPerfil.jsx'
import { ModalAcciones } from '../organismos/Modal.jsx'

function PerfilModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode }) {
  return (
      <>
          <ModalAcciones open={open} title={title} onClose={onClose} >
              <FormPerfil initialData={initialData} mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
          </ModalAcciones>

      </>
  )
}

export default PerfilModal