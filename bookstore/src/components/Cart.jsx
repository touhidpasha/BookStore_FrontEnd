import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'


import ProductHelper from '../contoller/ProductHelper';
import '../css/Cart.css'
import * as actionCreators from "../state/action-creators/servent"


export default function Cart(props) {
    const dispatch = useDispatch();
    const { setCarts } = bindActionCreators(actionCreators, dispatch);
    const navigate = useNavigate();
    const [book, setBook] = useState()
    const [numberOfCopies, setNumberOfCopies] = useState(1)

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

    return (<>
        {(book == null) ? <></> :
            <Paper elevation={2} sx={{ width: '1350px', height: '300px' }}>

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
                            Rs .{book.price}
                        </Typography>
                        <div class="cart-3">
                            <RemoveCircleOutlineIcon onClick={() => { setNumberOfCopies(prev => prev - 1) }}></RemoveCircleOutlineIcon>
                            <Paper>{numberOfCopies}</Paper>
                            <AddCircleOutlineIcon onClick={() => { setNumberOfCopies(prev => prev + 1) }}></AddCircleOutlineIcon>
                        </div>
                    </div>
                    <Button sx={{ height: "30px", marginTop: "90px" }} variant="contained" onClick={() => { props.showDetails(true) }} >PLACE ORDER</Button>
                </div>

            </Paper>}
    </>
    )
}