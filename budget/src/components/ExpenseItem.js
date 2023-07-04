import React, { useContext } from "react";
import { TiDelete } from 'react-icons/ti';
import { AppContext } from "../context/AppContext";


const ExpenseItem = (props) => {

    const {dispatch} = useContext(AppContext);

    const handleDeleteExpense = () => {

        // alert('Are you sure you want to delete it?');

        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,

        });
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {props.name}
            <div>
                <span className="badge rounded-pill text-bg-primary mr-3">
                    ₹{props.cost}
                </span>
                <TiDelete size='2em' onClick={handleDeleteExpense}/>
            </div>
        </li>
    );
};

export default ExpenseItem;
