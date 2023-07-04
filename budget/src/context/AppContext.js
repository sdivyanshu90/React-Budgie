import { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      const newExpense = {
        id: uuidv4(),
        name: action.payload.name,
        cost: action.payload.cost,
      };
      const newExpenses = [...state.expenses, newExpense];
      saveExpensesToLocalStorage(newExpenses);
      return {
        ...state,
        expenses: newExpenses,
      };

    case 'DELETE_EXPENSE':
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      saveExpensesToLocalStorage(updatedExpenses);
      return {
        ...state,
        expenses: updatedExpenses,
      };

    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };

    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };

    default:
      return state;
  }
};

const saveExpensesToLocalStorage = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

const getExpensesFromLocalStorage = () => {
  const storedExpenses = localStorage.getItem('expenses');
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};

const initialState = {
  budget: 15000,
  expenses: getExpensesFromLocalStorage(),
};

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    saveExpensesToLocalStorage(state.expenses);
  }, [state.expenses]);

  return (
    <AppContext.Provider value={{
      budget: state.budget,
      expenses: state.expenses,
      dispatch,
    }}>
      {props.children}
    </AppContext.Provider>
  )
};
