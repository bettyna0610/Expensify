import React from 'react'
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm'
import {editExpense,removeExpense} from '../actions/expenses'




const EditExpensePage = (props) => {
    return (
      <div>
        <div className="page-header">
        <div className="content-container">
<h1 className="page-header__title">Edit Expense</h1>
</div>
        </div>
        <div>
          
        </div>
        <div className="content-container">
        <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        props.dispatch(editExpense(props.expense.id, expense))
      props.history.push('/')
      }}/>
      <button className=" button button-secondary" onClick={() => {
              props.dispatch(removeExpense({id:props.expense.id})) 
        }
            
    }>Remove</button>
    </div>
    </div>
    )
  }

  const mapStateToProps = (state,props) => ({
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id
    })

  })

  export default connect(mapStateToProps) (EditExpensePage)
