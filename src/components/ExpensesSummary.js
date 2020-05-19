import React from 'react'
import expenseTotal from '../selectors/expenses-total'
import {connect} from 'react-redux'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'


const ExpensesSummary = (props) => (
    <div>
        Viewing {props.expenses.length} totalling {numeral(props.total/100).format('$0,0.00')}.
    </div>
)
const mapStateToProps =  (state) => {
    return {
        expenses: selectExpenses(state.expenses,state.filters),
        total:  expenseTotal(selectExpenses(state.expenses,state.filters))

        
    }
}

export default connect(mapStateToProps) (ExpensesSummary)



