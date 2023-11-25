import React, { useContext, useState }  from "react"
import { BudgetsContext } from '.';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext=React.createContext()

export function useBudgets (){
    return useContext(BudgetsContext)
}
// {
//     id:
//     name:
//     max
// }
// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider=({children})=>{
    const [budgets,setBudgets]=useState([])
    const [expenses,setExpenses]=useState([])

    function getBudgetExpenses(budgetId){ 
        return expenses.filter(expense=>expense.budgetId===budgetId)
      }
    function AddExpense({description,amount,budgetId}){ 
        setExpenses(prevExpenses=>{
           return [...prevExpenses,{id:uuidV4,description,amount,budgetId }]
        })
     }
    function AddBudget({ name,max }){ 
        setBudgets(prevBudget=>{
            if(prevBudgets.find(budget=>budget.name===name)){
                return prevBudgets
            }
            return [...prevBudget,{id:uuidV4,name,max }]
        })
     }
    function DeleteBudget({id}){ 
        // ToDo: deal with expenses
        setBudgets(prevBudgets=>{
            return prevBudgets.filter(budget=>budget.id!==id)
        })
     }
    function DeleteExpense({id}){ 
        setExpenses(prevExpenses=>{
            return prevExpenses.filter(Expense=>Expense.id!==id)
        })
     }

    return (
        <BudgetsContext.Provider value={{
            Budgets,
            Expenses,
            getBudgetExpenses,
            AddExpense,
            AddBudget,
            DeleteBudget,
            DeleteExpense
        }}> {children} </BudgetsContext.Provider>
    )
}