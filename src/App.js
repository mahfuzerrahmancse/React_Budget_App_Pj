import  Container from 'react-bootstrap/Container';
import { Button, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import BudgetCard  from './components/BudgetCard';
import UncategorizedBudgetCard  from './components/UncategorizedBudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import TotalBudgetCard from './components/TotaldBudgetCard';

function App() {
  const [showAddBudgetModal,setShowAddBudgetModal]=useState(false)
  const [showAddExpenseModal,setShowAddExpenseModal]=useState(false)
  const [ViewExpensesModalBudgetId,setViewExpensesModalBudgetId]=useState()

  const [AddExpenseModalBudgetId,setAddExpenseModalBudgetId]=useState()
  const {budgets,getBudgetExpenses}=useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
      <Stack direction="horizontal" gap="2" className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick={()=>setShowAddBudgetModal(true)} >Add Budget</Button>
        <Button variant='outline-primary' onClick={openAddExpenseModal} >Add Expense</Button>
      </Stack>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1rem",alignItems:"flex-start"}} >
        {budgets?.map(budget=>{
          const amount=getBudgetExpenses(budget.id).reduce((total,expense)=>total+expense.amount,0)
          return (
            <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} onAddExpenseClick={()=>openAddExpenseModal(budget.id)} onViewExpenseClick={()=>setViewExpensesModalBudgetId(budget.id)} />
          )
        })}
        <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpensesClick={()=>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
        <TotalBudgetCard />
      </div>
    </Container>   
    <AddBudgetModal show={showAddBudgetModal} handleClose={()=>setShowAddBudgetModal(false)} /> 
    <AddExpenseModal show={showAddExpenseModal} 
    defaultBudgetId={AddExpenseModalBudgetId}
    handleClose={()=>setShowAddExpenseModal(false)} 
    /> 
    <ViewExpensesModal budgetId={ViewExpensesModalBudgetId} 
    handleClose={()=>setViewExpensesModalBudgetId()} 
    /> 
    </>    
  );
}

export default App;
