import React from 'react'
import expenseTotal from '../selectors/expenses-total'
import {connect} from 'react-redux'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'
import {Link} from 'react-router-dom'


const ExpensesSummary = (props) => (
    <div className="page-header">
        <div className="content-container">
        <h1 className="page-header__title">
        Viewing <span>{props.expenses.length}</span> totalling <span>{numeral(props.total/100).format('$0,0.00')}</span>.
            </h1>
        </div>
        <div className="page-header__actions">
            <Link className="button" to="/create">Add Expense</Link>
        </div>
        
    </div>
)
const mapStateToProps =  (state) => {
    return {
        expenses: selectExpenses(state.expenses,state.filters),
        total:  expenseTotal(selectExpenses(state.expenses,state.filters))

        
    }
}

export default connect(mapStateToProps) (ExpensesSummary)



