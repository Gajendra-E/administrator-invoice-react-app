import { CREATE_INVOICE, UPDATE_INVOICE, FETCH_INVOICE, DELETE_INVOICE } from "../actions/actionTypes";

let initialState = {
    invoice: null
}

export function invoiceReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_INVOICE:
            return {
                ...state,
                invoice: action.data
            }
        case UPDATE_INVOICE:
            return {
                ...state,
                invoice: action.data
            }
        case FETCH_INVOICE:
            return {
                ...state,
                invoice: action.data
            }
        case DELETE_INVOICE:
            return {
                ...state,
                invoice: action.data
            }
        default:
            return state;
    }
}