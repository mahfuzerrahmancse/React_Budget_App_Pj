import React from 'react'
import { Button, Card, CardBody, ProgressBar, Stack } from 'react-bootstrap'
import { currencyFormatter } from '../utils'

export default function BudgetCard({name,amount,max,gray,hideButtons,onAddExpenseClick,onViewExpenseClick}) {
    const classNames=[]
    if (amount>max){
        classNames.push('bg-danger', 'bg-opacity-10')
    }else if(gray){
        classNames.push('bg-light')
    }
  return (
    <Card className={classNames.join(' ')} >
        <CardBody>
            <Card.Title className='d-flex justify-content-between alingn-items-baseline fw-narmal mb-3' >
                <div className='me-2' > {name} </div>
                <div className='d-flex align-items-baseline' > {currencyFormatter.format(amount)} { max && (
                    <span className='text-muted ts-6 ms-1'> /{currencyFormatter.format(max)}</span>
                ) } </div>
            </Card.Title>
            {max && (<ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount,max)} min={0} max={max} now={amount} />)}
            {!hideButtons &&(
                <Stack direction='horizontal' gap='2' className='mt-4'  >
                <Button variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick} >Add Expense</Button>
                <Button onClick={onViewExpenseClick} variant='outline-secondary' >View Expense</Button>
            </Stack>
            )}
        </CardBody>
    </Card>
  )
}

function getProgressBarVariant(amount,max){
    const ratio=amount/max
    if (ratio<.5) return "primary"
    if (ratio<.75) return "warning"
    return "danger"
}