import {addExpense,editExpense,removeExpense} from '../../actions/expenses'
import {setStarDate,setEndDate} from '../../actions/filters'
import moment from 'moment'
import { setStartDate,setEndDate, setTextFilter } from '../actions/filters'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import React from 'react'
import Header from '../components/Header'
import {shallow} from 'enzyme'

test('should generate start date', () => {
const action = setStartDate(moment(0))
expect(action).toEqual({
    type:'SET_START_DATE',
    startDate: moment(0)
})
})

test('should generate end date', () => {
const action = setEndDate(moment())
expect(action).toEqual({
    type:'SET_END_DATE',
    endDate:moment(0)
})
})

test('setting text filter', () => {
    const action = setTextFilter('water')
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'water'
    })
})

test('setting text filter with default', () => {
    const action = setTextFilter()
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    })
})

const expenses = [{
    id:'1',
    dscription:'Gum',
    note:'',
    amount:195,
    createdAt:0
  }, {
    id:'2',
    dscription:'Rent',
    note:'',
    amount:109500,
    createdAt:moment(0).subtract(4,'days').valueOf()
  }, {
    id:'3',
    dscription:'Credit Card',
    note:'',
    amount:4500,
    createdAt:moment(0).add(4,'days').valueOf()
  }
  ]
  
  test('should filter by test value', () => {
    const filters ={
      text:'e',
      sortBy:'date',
      startDate:undefined,
      endDate:undefined
    }
    const result = selectExpenses(expenses, filters)
    
    expect(result).toEqual([expenses[2], expenses[1]])
  })
  
  test('should filter by startDate', () => {
    const filters ={
      text:'',
      sortBy:'date',
      startDate:moment(),
      endDate:undefined
    }
    const result = selectExpenses(expenses, filters)
    
    expect(result).toEqual([expenses[0], expenses[2]])
  })

  test('should filter by endDate', () => {
    const filters ={
      text:'',
      sortBy:'date',
      startDate:undefined,
      endDate:moment()
    }
    const result = selectExpenses(expenses, filters)
    
    expect(result).toEqual([expenses[0], expenses[2]])
  })
  
  test('should filter by date', () => {
    const filters ={
      text:'',
      sortBy:'date',
      startDate:undefined,
      endDate:undefined
    }
    const result = selectExpenses(expenses, filters)
    
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
  })
  
  test('should filter by amount', () => {
    const filters ={
      text:'',
      sortBy:'amount',
      startDate:undefined,
      endDate:undefined
    }
    const result = selectExpenses(expenses, filters)
    
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
  })

test('should setup default filter values', () => {
   const state = filtersReducer(undefined, {type:'@@INIT'})
   expect(state).toEqual({
     text:'',
     sortBy:'date',
     startDate:moment().startOf('month'),
     endDate:moment().endOf('moment')

   })
})

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type:'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
  const currentState = {
    text:'',
    startDate: undefined,
    endDate: undefined,
    sortBy:'amount'
  }
  const action = {type:'SORT_BY_DATE'}
  const state = filtersReducer(currentState, action)
  expect(state.sortBy).toBe('date')
})

test('should set text', () => {
  const action = {type:'SET_TEXT_FILTER',text:'water'}
  const state = filtersReducer(undefined,action)

  expect(state.text).toBe('water')
})

test('should set startDate', () => {
  const action = {type:'SET_START_DATE', startDate:0}
  const state = filtersReducer(undefined,action)
  expect(state.startDate).toBe(0)
})

test('should remove expense', () => {
  const action = {
    type:'REMOVE_EXPENSE',
    id: expenses[1].id
  }

  const state = expensesReducer(expenses,action)
  expect(state).toEqual([expenses[0],expenses[2]])
})

test('should add expense', () => {
  const action = {
    type:'ADD_EXPENSE',
    expense: {
      id:'4',
      description:'bill',
      note:'',
      amount: 1300,
      createdAt:moment()
    }
  }

  const state = expensesReducer(expenses,action)

  expect(state).toEqual([...expenses, action.expense])

})

test('should edit expense', () => {
  const action ={
    type:'EDIT_EXPENSE',
    id:'2',
    updates:{
      id:'3'
    }
  }

  const state = expensesReducer(expenses, action)

  expect(state[1].id).toBe('3')
})















const add = (a,b) => a+b 

const generateGreeting = (name) => `Hello ${name}`

test('should add two numbers', () => {
    const result = add(3,4);
    expect(result).toBe(7)

    if(result !== 7) {
        throw new Error(`You added 3 and 3. The result was ${result}. Expect 7 `)
    }
})

test('should write name', () => {
    const result = generateGreeting('Bettina')
    expect(result).toBe(' Hello Bettina')
})

test('should setup remove expense action object', () => {
    const action = removeExpense({id:'123'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
})

test('should render Header correctly', () => {
  const wrapper = shallow(<Header/>)
  expect(wrapper.find('h1').text()).toBe('Expensify')
})

test('should render ExpenseList', () => {
  const wrapper = shallow(<ExpenseList expenses={[]}/>)
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListItem', () => {
  const wrapper = shallow(<ExpenseListItem/>)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  })

  expect(wrapper.state('error').length).toBeGreaterThan(0)
})

test('should render textarea', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('textarea').simulate('change', {
   target: {value} 
  })

  expect(wrapper.state('note')).toBe(value)
})

test('should render valid amount', () => {
  const value = 23.50
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('should set focused', () => {
  const wrapper = shallow(<ExpenseForm/>)
  wrapper.find('SingleDatePicker').prop('onFocusChange')(true)
  expect(wrapper.state('calendarFocused')).toEqual(true)
})

test('should handle editExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
  const editExpense = jest.fn()
  const history = {push:jest.fn()
  }

  const wrapper = shallow(<EditExpensePage />)

  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
  

  
})