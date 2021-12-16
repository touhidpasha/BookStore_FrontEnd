import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'


import ProductHelper from '../contoller/ProductHelper';
import '../css/Cart.css'
import * as actionCreators from "../state/action-creators/servent"


export default function OrderSummary(props) {
    const dispatch = useDispatch();
    const {  setCarts } = bindActionCreators(actionCreators, dispatch);

    const navigate = useNavigate();
    const [book, setBook] = useState()
    const [numberOfCopies, setNumberOfCopies] = useState(1)
    const [OrderId, setOrderId] = useState( Date.now())

    useEffect(async () => {
        setBook(await ProductHelper.getBookDetails({ "id": props.book.itemId }))
    }, [])
    useEffect(async () => {
        if (numberOfCopies < 1) {
            ProductHelper.deleteCart({ "_id": props.book._id })
            navigate("/dashboard")
            var res = await ProductHelper.getAllCartItems({ "token": localStorage.getItem("token") })
            setCarts(res.data)
        }
        else {
            ProductHelper.updateCart({ "_id": props.book._id, "token": localStorage.getItem("token"), "numberOfItems": numberOfCopies })
            var res = await ProductHelper.getAllCartItems({ "token": localStorage.getItem("token") })
            setCarts(res.data)
        }
    }, [numberOfCopies])
    const handleOrder=() => {
        ProductHelper.placeOrder({"orderNumber":OrderId,"token": localStorage.getItem("token"),"itemId":book._id,"numberOfCopies":numberOfCopies})
    }
    return (<>
        {(book == null) ? <></> :
            <Paper elevation={2} sx={props.showSummary ? { width: '1350px', height: '300px' } : {  width: '1350px', height: '30px' }} >
            <div class="cart">
                <Typography variant="h6" sx={{paddingLeft:'0px'}}>Order Summary</Typography>
                {props.showSummary ? <>
                    <div class="cart-1">
                        <img src={book.image} style={{ width: "200px", height: "250px" }} alt="loading..." />
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
                    </div>
                </>
                    : <></>}
            </div>
            </Paper>}
    </>
    )
}