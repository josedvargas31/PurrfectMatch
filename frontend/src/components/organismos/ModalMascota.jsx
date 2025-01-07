import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

export const ModalAcciones = ({ open, onClose, children, title }) => {

  return (
    <>

<Modal isOpen={open} onClose={onClose} placement="top-center" size='3xl'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>

                  {children}
                
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

</>
  ) 
}