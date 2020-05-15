import React from 'react'
import {connect} from 'react-redux'
import {removeExpense} from '../actions/expenses'
import {Link} from 'react-router-dom'


const ExpenseListItem = (props) => (
    <div>
        {props.expenses.map( expense => {
            const link = `/edit/${expense.id}`
            return (
                <div key={expense.id}>
            <h3> <Link to={link}> {expense.description}</Link>  </h3> 
        <p> {expense.amount} - {expense.createdAt}</p>
        
        </div>)})}
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses:state.expenses
    }
}

export default  connect (mapStateToProps) (ExpenseListItem)