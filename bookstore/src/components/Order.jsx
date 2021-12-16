import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@mui/material'
import Image from 'material-ui-image'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import Header from '../components/Header'

import '../css/Order.css'
import ProductHelper from '../contoller/ProductHelper'
import Cart from '../components/Cart'
import OrderSummary from "../components/OrderSummary"

export default function Order(props) {
    const cartState = useSelector((state) => state.cart);//getting from redux
    const [showDetails, setShowDetails] = useState(false)
    const [showSummary, setShowSummary] = useState(false)

    const [cartItems, setCartItems] = useState(cartState['data'])
    const [books, setBooks] = useState()
    const [cartCount, setCartCount] = useState(cartItems.length)
    const [fValue, changeFormValues] = useState({
        "name": "",
        "phoneNumber": "",
        "pinCode": "",
        "locality": "",
        "address": "",
        "city": "",
        "landmark": "",
        "type": "",
        "token": localStorage.getItem("token")
    });

    useEffect(async () => {
        var address = await ProductHelper.getAddress({ "token": localStorage.getItem("token") })
        changeFormValues({
            ...fValue,
            ["name"]: [address.name],
            ["phoneNumber"]: [address.phoneNumber],
            ["pinCode"]: [address.pinCode],
            ["locality"]: [address.locality],
            ["address"]: [address.address],
            ["city"]: [address.city],
            ["landmark"]: [address.landmark],
            ["type"]: [address.type],
        })
    }, [])

    const getFormValues = (event) => {
        changeFormValues({
            ...fValue,
            [event.target.name]: event.target.value
        })
    }
    const showDetailsHandler = (value) => {
        setShowDetails(value)
    }

    const updateAddresses = async () => {
        ProductHelper.updateAddresses(fValue)
    }
    return (
        <>
            <Header />
            <div class="main">
                <div class="cart">
                    <Typography variant="h6">MY cart({cartCount})</Typography>
                    {cartItems.map(book => <Cart book={book}  showDetails={showDetailsHandler}></Cart>)}
                </div>
                <Paper elevation={2} sx={showDetails ? { width: '70%', height: '400px' } : { width: '70%', height: '40px' }} >
                    <div class="main2">
                    <Typography sx={{paddingLeft:"600px"}}>Customer Details</Typography>
                        {showDetails ? <>
                            <div class="grid">
                                <TextField className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="Name" label="Name" name="name" value={fValue.name} onChange={getFormValues} />
                                <TextField className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="Phone Number" label="Phone Number" name="phoneNumber" value={fValue.phoneNumber} onChange={getFormValues} />
                                <TextField className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="PinCode" label="PinCode" name="pinCode" value={fValue.pinCode} onChange={getFormValues} />
                                <TextField className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="Locality" label="Locality" name="locality" value={fValue.locality} onChange={getFormValues} />
                            </div >
                            <TextField multiline rows="3" className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="Address" label="Address" name="address" value={fValue.address} onChange={getFormValues} />
                            <div>
                                <TextField className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="City" label="City" name="city" value={fValue.city} onChange={getFormValues} />
                                <TextField className="textField" type={'text'} sx={{ paddingRight: 2 }} placeholder="LandMark" label="LandMark" name="landmark" value={fValue.landmark} onChange={getFormValues} />
                            </div>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Type</FormLabel>

                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={fValue.type}>
                                        <FormControlLabel value="Home" name="type" control={<Radio />} label="Home" />
                                        <FormControlLabel value="Work" name="type" control={<Radio />} label="Work" />
                                        <FormControlLabel value="Other" name="type" control={<Radio />} label="Other" />
                                        <Button sx={{ height: "30px", marginTop: "10px", marginLeft: "60px" }} variant="contained" onClick={() => { setShowSummary(!showSummary); updateAddresses(); }}>CONTINUE</Button>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </>
                            : <></>}
                    </div>
                </Paper >
                <div class="cart">
                    {cartItems.map(book => <OrderSummary book={book} showDetails={showDetailsHandler} showSummary={showSummary}></OrderSummary>)}
                </div>

            </div>
        </>
    )
}