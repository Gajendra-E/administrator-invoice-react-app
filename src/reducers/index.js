import { combineReducers } from 'redux';
import { invoiceReducer } from './invoiceReducer'

const allReducers = combineReducers({
   invoiceReducer
})

export default allReducers;