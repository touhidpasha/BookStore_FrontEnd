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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'


import ProductHelper from '../contoller/ProductHelper';
import '../css/Cart.css'
import * as actionCreators from "../state/action-creators/servent"


export default function OrderSummary(props) {
    const dispatch = useDispatch();
    const { setBooks, setCarts } = bindActionCreators(actionCreators, dispatch);

    const navigate = useNavigate();
    const [book, setBook] = useState()
    const [numberOfCopies, setNumberOfCopies] = useState(1)
    // const [OrderId, setOrderId] = useState(Math.random() * (9999- 999) + 999)
    const [OrderId, setOrderId] = useState( Date.now())

    useEffect(async () => {
        console.log("from order" + JSON.stringify(props.book));
        setBook(await ProductHelper.getBookDetails({ "id": props.book.itemId }))
        console.log("book in cart comp " + book);
    }, [])
    useEffect(async () => {
        console.log("copies changing");
        if (numberOfCopies < 1) {
            ProductHelper.deleteCart({ "_id": props.book._id })
            navigate("/dashboard")
            var res = await ProductHelper.getAllCartItems({ "token": localStorage.getItem("token") })
            // console.log("in dash from BE " + JSON.stringify(res));
            setCarts(res.data)

        }
        else {
            ProductHelper.updateCart({ "_id": props.book._id, "token": localStorage.getItem("token"), "numberOfItems": numberOfCopies })
            var res = await ProductHelper.getAllCartItems({ "token": localStorage.getItem("token") })
            // console.log("in dash from BE " + JSON.stringify(res));
            setCarts(res.data)
        }
    }, [numberOfCopies])
    const handleOrder=() => {
        console.log("item ordered"+book._id);
        ProductHelper.placeOrder({"orderNumber":OrderId,"token": localStorage.getItem("token"),"itemId":book._id,"numberOfCopies":numberOfCopies})
        
    }
    return (<>
        {(book == null) ? <></> :
            <Paper elevation={2} sx={props.showSummary ? { width: '1350px', height: '300px' } : {  width: '1350px', height: '30px' }} >
            <div class="cart">
                <Typography variant="h6" sx={{paddingLeft:'0px'}}>Order Summary</Typography>
                {props.showSummary ? <>
                    <div class="cart-1">
                        {/* <div> */}
                        <img src={book.image} style={{ width: "200px", height: "250px" }} alt="loading..." />
                        {/* </div> */}
                        <div class="cart-2">
                            <Typography gutterBottom variant="h6" component="div">
                                {book.title}
                            </Typography>
                            <Typography variant="h5" color="'text'.secondary">
                                {book.author}
                            </Typography>
                            <Typography variant="h9" color="'text'.secondary">
                                RS.{book.price}
                            </Typography>
                        </div>
                        <Button sx={{ height: "30px", marginTop: "70px" }} variant="contained" component={Link} to={'/orderedItem'} onClick={handleOrder}>CHECKOUT</Button>
                        {/* <Button sx={{ height: "30px", marginTop: "70px" }} variant="contained" onClick={handleOrder}>CHECKOUT</Button> */}

                    </div>
                </>
                    : <></>}
            </div>
            </Paper>}
    </>
    )
}