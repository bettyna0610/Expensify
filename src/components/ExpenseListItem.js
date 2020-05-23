import React from 'react'
import {connect} from 'react-redux'
import {removeExpense} from '../actions/expenses'
import {Link} from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

const ExpenseListItem = (props) => (
    <div>
        {props.expenses.map( expense => {
            const link = `/edit/${expense.id}`
            return (
                
             <Link className="list-item" to={link}> <h3 className="list-item__title" >{expense.description}</h3>  
        
       <span className="list-item__sub-title" > {moment( expense.createdAt).format('MMMM Do, YYYY')} </span>
            
            
            <h3 className="list-item__data">{numeral(expense.amount/100).format('$0,0.00')} </h3>
             </Link>
        )})}
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses:state.expenses
    }
}

export default  connect (mapStateToProps) (ExpenseListItem)