import React, { useRef } from 'react'
import { Button, Form,Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetsContext'

export default function AddBudgetModal({show,handleClose}) {
    const nameRef=useRef()
    const maxRef=useRef()
    const {addBudget}=useBudgets()

    function handleSubmit(e){
        e.preventDafault()
        AddBudgetModal(
            {
                name:nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            }
        )
        handleClose()

    }

  return (
    <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit} >
            <ModalHeader>
                <ModalTitle>New Budget</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form.Group className='mb-3' controlId='name' >
                    <Form.Label> Name </Form.Label>
                    <Form.Control ref={nameRef} type='text' required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='max' >
                    <Form.Label> Maximum Spending </Form.Label>
                    <Form.Control ref={maxRef} type='number' required min={0} step={0.01} />
                </Form.Group>
                <div className='d-flex justify-content-end' >
                    <Button variant='primary' type='submit' >Add</Button>
                </div>
            </ModalBody>
        </Form>
    </Modal>
  )
}
