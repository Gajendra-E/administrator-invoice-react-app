import React, { Component } from 'react';

import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Button, Dialog, DialogActions, Toolbar,
    DialogContent, DialogTitle, TextField, IconButton, TablePagination, TableContainer, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from "redux";
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import { createInvoice, updateInvoice, fetchInvoice, deleteInvoice } from '../actions/invoiceAction'
import _ from 'underscore';

const styles = theme => ({
    fontCellHeader: {
        fontFamily: "Futura-Book",
        color: "#fff",
        fontWeight: 900,
        padding: '14px 20px 14px 10px',

    },
    fontTableCellBody: {
        fontWeight: 700,
        fontFamily: "Futura-Medium-bt",
        color: "#37474f",
        padding: '14px 20px 14px 10px',
    },
    addButton: {
        backgroundColor: "#2B99CD",
        color: "white",
        fontFamily: "unicode.futurab",
        borderRadius: "10",
        textTransform: 'none',
    },
    cancelButton: {
        backgroundColor: "#8fa3ad",
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(143, 163, 173, 0.8)',
        }
    },
    editButton: {
        backgroundColor: "#8fa3ad",
        margin: 2,
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(143, 163, 173, 0.8)',
        }
    },
    viewButton: {
        backgroundColor: "red",
        margin: 2,
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'red',
        }
    },
    inputStyle: {
        fontFamily: "Futura-Book",
        fontSize: 14
    },
    labelStyle: {
        fontFamily: "Futura-Book",
        fontSize: 14
    },
    textStyle: {
        color: "#37474f",
        fontWeight: "bold",
        fontSize: 25,
        padding: 5
        //padding: 10   
    },
})

class Invoive extends Component {
    constructor() {
        super();
        this.state = {
            recipient: "",
            recipient_error: false,
            amount: null,
            amount_error: false,
            paymentDueDate: null,
            paymentDueDate_error: false,
            invalid_date_error: false,
            alreadyPaid: "",
            alreadyPaid_error: false,
            dialogOpen: false,
            mode: "",
            id: null,

        }
    }

    componentDidMount() {
        // fetch('http://localhost:3005/user')
        //     .then(response => response.json())
        //     .then(data => console.log("------------------" + data));
        this.props.dispatch(fetchInvoice())
    }
    handleClick = (item, mode) => {
        if (mode === "ADD") {
            this.setState({ mode: mode, dialogOpen: true })
        }
        else {
            this.setState({
                id: item.id,
                dialogOpen: true,
                mode: mode,
                recipient: item.recipient,
                amount: item.amount,
                paymentDueDate: item.paymentDueDate,
                alreadyPaid: (item.alreadyPaid === true || item.alreadyPaid === "true") ? "true" : "false"
            })
        }
    }
    submitForDelete = (id) => {
        this.props.dispatch(deleteInvoice(this, id))
    }

    handleSubmit = (mode) => {
        let { id, recipient, amount, paymentDueDate, alreadyPaid } = this.state
        let isError = false;
        if (recipient === "" || recipient === null) {
            this.setState({ recipient_error: true })
            isError = true;
        }
        if (amount === "" || amount === null) {
            this.setState({ amount_error: true })
            isError = true;
        }
        if (paymentDueDate === "" || paymentDueDate === null) {
            this.setState({ paymentDueDate_error: true })
            isError = true;
        }
        if (alreadyPaid === "" || alreadyPaid === null) {
            this.setState({ alreadyPaid_error: true })
            isError = true;
        }

        if (isError === false) {
            let invoiceObj = {};
            invoiceObj.recipient = recipient;
            invoiceObj.amount = amount;
            invoiceObj.paymentDueDate = paymentDueDate;
            invoiceObj.alreadyPaid = alreadyPaid
            if (mode === "ADD") {
                this.props.dispatch(createInvoice(this, invoiceObj))
            }
            else {
                this.props.dispatch(updateInvoice(this, invoiceObj, id))
            }
        }
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false,
            recipient: "",
            recipient_error: false,
            amount: null,
            amount_error: false,
            paymentDueDate: null,
            paymentDueDate_error: false,
            invalid_date_error: false,
            alreadyPaid: "",
            alreadyPaid_error: false,
            dialogOpen: false,
            mode: "",
            id: null,
        })
    }
    handleDateChange = (paymentDueDate) => {
        this.setState({ paymentDueDate: paymentDueDate, paymentDueDate_error: false, invalid_paymentDueDate_error: false });
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ margin: 20 }}>
                <Grid item xs={12} sm={12} style={{ backgroundColor: "#fff", borderRadius: 5, boxShadow: "0ppx 0px rgba(0, 0, 0, 0.2)" }}>
                    <Toolbar style={{ justifyContent: "space-between", padding: "5px 20px 0px 0px", marginBottom: 10 }}>
                        <div></div>
                        <Typography className={classes.textStyle}>Administrator Invoices</Typography>

                        <Button size="small" variant="contained" color="primary" className={classes.addButton} onClick={() => this.handleClick(null, "ADD")} >
                            Create Invoice
                        </Button>
                    </Toolbar>

                    <TableContainer style={{ backgroundColor: '#f2f2f2' }}>
                        <Table>
                            <TableHead style={{ background: "linear-gradient(to right, #2687C4, #2A98CA, #2EAAD4, #32BCD9)" }}>
                                <TableRow>
                                    <TableCell align="left" className={classes.fontCellHeader}>Recipient</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Amount</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Payment Due Date</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Already Paid</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    this.props.invoive !== null && this.props.invoive.length > 0 ? (_.sortBy(this.props.invoive, 'id').map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.recipient}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.amount}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{moment(item.paymentDueDate).format("DD-MM-YYYY")}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{(item.alreadyPaid === "true" || item.alreadyPaid === true) ? "Yes" : "NO"}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>
                                                <Button size="small" className={classes.editButton} onClick={() => this.handleClick(item, "EDIT")}>Edit</Button>
                                                <Button size="small" className={classes.viewButton} onClick={() => this.submitForDelete(item.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>)
                                    ))
                                        :
                                        <TableCell colspan={4} style={{ textAlign: "center" }}>There are no invoices </TableCell>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Dialog
                    maxWidth={"sm"}
                    open={this.state.dialogOpen}>
                    <DialogTitle id="form-dialog-title">
                        <Typography style={{ padding: "2% 5% 0 5%", fontFamily: "Futura-Heavy" }}>{this.state.mode === "ADD" ? "Create Invoice" : "Update Invoice"}</Typography>
                    </DialogTitle>
                    <DialogContent style={{ overflowY: "hidden" }}>
                        <Grid container justify="space-between" style={{ marginTop: -20, padding: "2% 5% 0 5%" }}>

                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <TextField
                                    id="recipient"
                                    label="Recipient"
                                    name="recipient"
                                    className={classes.margin}
                                    value={this.state.recipient}
                                    onChange={(event) => this.setState({ recipient: event.target.value, recipient_error: false })}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        classes: { input: classes.inputStyle }
                                    }}
                                    fullWidth
                                    error={this.state.recipient_error === true ? true : false}
                                    helperText={this.state.recipient_error === true ? "Please enter recipient" : false}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <TextField
                                    id="amount"
                                    label="Amount"
                                    name="amount"
                                    // disabled={this.state.mode === "EDIT" ? true : false}
                                    className={classes.margin}
                                    value={this.state.amount}
                                    onChange={(event) => this.setState({ amount: event.target.value, amount_error: false })}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        classes: { input: classes.inputStyle }
                                    }}
                                    fullWidth
                                    error={this.state.amount_error === true ? true : false}
                                    helperText={this.state.amount_error === true ? "Please enter amount" : false}
                                />
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }} >
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="PaymentDueDate"
                                            format="MM/dd/yyyy"
                                            value={this.state.paymentDueDate}
                                            required
                                            disableFuture={false}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            InputProps={{
                                                classes: { input: classes.inputStyle }
                                            }}
                                            fullWidth
                                            onChange={this.handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}

                                            error={this.state.paymentDueDate_error === true ? true : this.state.invalid_paymentDueDate_error === true ? true : false}
                                            helperText={this.state.paymentDueDate_error === true ? "Please enter date " : this.state.invalid_paymentDueDate_error === true ? "Please enter correct  date" : false}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: 8 }}>
                                <div style={{ padding: "2% 0 2% 0" }}>
                                    <Typography style={{ fontFamily: "Futura-Book", fontSize: 12, color: 'rgba(0, 0, 0, 0.54)' }}>AlreadyPaid</Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="position" name="position" value={this.state.alreadyPaid}
                                            onChange={(event) => this.setState({ alreadyPaid: event.target.value, alreadyPaid_error: false })} row>
                                            <FormControlLabel
                                                value="true"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span className={classes.labelStyle}>Yes</span>}
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio style={{ color: "#20478e" }} />}
                                                label={<span className={classes.labelStyle}>No</span>}
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                        {this.state.alreadyPaid_error === true && <FormHelperText style={{ color: "red" }}>{"Please select alreadyPaid"}</FormHelperText>}
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={() => this.handleSubmit(this.state.mode)} variant="contained" color="primary" className={classes.addButton}>Submit</Button>
                        <Button size="small" onClick={() => this.handleClose()} variant="contained" color="secondary" className={classes.cancelButton}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>)
    }
}
const mapStateToProps = (state) => {

    return {
        invoive: state.invoiceReducer.invoice
    }
}
Invoive.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default compose(withStyles(styles), connect(mapStateToProps))(Invoive);

