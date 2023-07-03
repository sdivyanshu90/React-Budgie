import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ExpenseTotal = () => {

    const { expenses } = useContext(AppContext);

    const totalExpenses = expenses.reduce((total, item) => {
        return (
            total += item.cost
        );
    }, 0);

    return (
        <div className="alert alert-primary p-4">
            <span>Spent So Far: ₹{totalExpenses}</span>
        </div>
    );
};

export default ExpenseTotal;
