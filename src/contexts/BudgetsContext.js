// import React, { useContext, useState }  from "react"
// import { BudgetsContext } from '.';
// import { v4 as uuidV4 } from 'uuid';
// import useLocalStorage from "../hooks/useLocalStorage";

// const BudgetsContext=React.createContext()

// export const UNCATEGORIZED_BUDGET_ID="Uncategorized"

// export function useBudgets (){
//     return useContext(BudgetsContext)
// }


// export const BudgetsProvider=({children})=>{
//     const [budgets,setBudgets]=useLocalStorage("budgets",[])
//     const [expenses,setExpenses]=useLocalStorage("expenses",[])

//     function getBudgetExpenses(budgetId){ 
//         return expenses.filter(expense=>expense.budgetId===budgetId)
//       }
//     function AddExpense({description,amount,budgetId}){ 
//         setExpenses(prevExpenses=>{
//            return [...prevExpenses,{id:uuidV4,description,amount,budgetId }]
//         })
//      }
//     function AddBudget({ name,max }){ 
//         setBudgets(prevBudget=>{
//             if(prevBudgets.find(budget=>budget.name===name)){
//                 return prevBudgets
//             }
//             return [...prevBudget,{id:uuidV4,name,max }]
//         })
//      }
//     function DeleteBudget({id}){ 
//         setExpenses(prevExpenses=>{
//             return prevExpenses.map(expense=>{
//                 if (expense.budgetId!=id) return expense
//                 return {...expense,budgetId:UNCATEGORIZED_BUDGET_ID}
//             })
//         })
//         setBudgets(prevBudgets=>{
//             return prevBudgets.filter(budget=>budget.id!==id)
//         })
//      }
//     function DeleteExpense({id}){ 
//         setExpenses(prevExpenses=>{
//             return prevExpenses.filter(Expense=>Expense.id!==id)
//         })
//      }

//     return (
//         <BudgetsContext.Provider value={{
//             Budgets,
//             Expenses,
//             getBudgetExpenses,
//             AddExpense,
//             AddBudget,
//             DeleteBudget,
//             DeleteExpense
//         }}> {children} </BudgetsContext.Provider>
//     )
// }
import React, { useContext } from "react";
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";

export const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function AddExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4, description, amount, budgetId }];
        });
    }

    function AddBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4, name, max }];
        });
    }

    function DeleteBudget({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
            });
        });
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        });
    }

    function DeleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(Expense => Expense.id !== id);
        });
    }

    return (
        <BudgetsContext.Provider value={{
            Budgets: budgets,
            Expenses: expenses,
            getBudgetExpenses,
            AddExpense,
            AddBudget,
            DeleteBudget,
            DeleteExpense
        }}>{children}</BudgetsContext.Provider>
    );
};
