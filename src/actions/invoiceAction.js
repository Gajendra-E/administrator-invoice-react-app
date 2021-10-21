import { CREATE_INVOICE, FETCH_INVOICE, UPDATE_INVOICE, DELETE_INVOICE } from "./actionTypes";
import API from '../api'

export function fetchInvoice() {
    return function (dispatch) {
        API.get('invoice').then((response) => {

            if (response.status === "success") {
                dispatch({
                    type: FETCH_INVOICE,
                    data: response.payload
                });
            }
        });
    }
}


export function createInvoice(self, item) {
    alert(item)
    return dispatch => {
        API.post('invoice', item).then((response) => {
            if (response.status === "success") {
                dispatch(fetchInvoice())
                self.setState({
                    dialogOpen: false,
                    id: null,
                    recipient: "",
                    recipient_error: false,
                    amount: "",
                    amount_error: false,
                    paymentDueDate: "",
                    paymentDueDate_error: false,
                    alreadyPaid: "",
                    alreadyPaid_error: false
                    // mode: ""
                })
            }
            else {
                alert(response.status)
            }

        })
    }
}

export function updateInvoice(self, item, id) {
    return dispatch => {
        API.put('invoice/' + id, item).then((response) => {
            if (response.status === "success") {
                dispatch(fetchInvoice());
            }
            self.setState({
                dialogOpen: false,
                id: null,
                recipient: "",
                recipient_error: false,
                amount: "",
                amount_error: false,
                paymentDueDate: "",
                paymentDueDate_error: false,
                alreadyPaid: "",
                alreadyPaid_error: false
                //mode: ""
            })
        })
    }
}

export function deleteInvoice(self, id) {
    return dispatch => {
        API.delete('invoice/' + id).then((response) => {
            if (response.status === "success") {
                dispatch(fetchInvoice());
            }
        })
    }
}


