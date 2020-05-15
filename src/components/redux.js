import {createStore, combineReducers} from 'redux'

const demoState = {
    expenses: [{
        id: 'ikjn',
        dscription: 'January rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],

    filters: {
        text:'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};

const expensesReducerDefaultState = []

const expenseReducer = (state = [expensesReducerDefaultState],action) => {
   switch(action.type) {
       default: 
       return state
   }
}

const store = createStore(expenseReducer)

console.log(store.getState());