import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses'
import {setTextFilter} from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import {Provider} from 'react-redux'


const store = configureStore()

store.dispatch(addExpense({description:'Water bill',amount:4500}))
store.dispatch(addExpense({description:'Gas bill'}))
store.dispatch(addExpense({description:'Rent',amount:1095,createdAt:1000}))

store.dispatch(setTextFilter('water'))

const state = store.getState()

const visibleExpenses = getVisibleExpenses(state.expenses,state.filters)
console.log(visibleExpenses)

const jsx = (
  <Provider store={store}>
<App/>
  </Provider>

)

ReactDOM.render(jsx,document.getElementById('root'))
