import React, { useState } from 'react';
import Image from "material-ui-image"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { bindActionCreators } from 'redux'
import { useDispatch } from "react-redux";

import "../css/Product.css"
import ProductHelper from '../contoller/ProductHelper'
import * as actionCreators from "../state/action-creators/servent"

export default function Product(props) {
    const dispatch = useDispatch();
    const {  setCarts } = bindActionCreators(actionCreators, dispatch);
    const [book, setBook] = useState(props.book)
    const addToCartHandler = async () => {
        await ProductHelper.addToCart({ "itemId": book._id, "token": localStorage.getItem('token'), "numberOfItems": 1 })
        var res = await ProductHelper.getAllCartItems({ "token": localStorage.getItem("token") })
        setCarts(res.data)
    }

    return (
        <Card sx={{ width: '335px', height: "315" }}>
            <div class="product">
                <div >
                    <div>
                        <Image src={book.image} alt="loading..." ></Image>
                    </div>
                    <CardContent>
                        <div class="div2">
                            <Typography gutterBottom variant="h6" component="div">
                                {book.title}
                            </Typography>
                            <Typography variant="h5" color="text.secondary">
                                {book.author}
                            </Typography>
                            <Typography variant="h9" color="text.secondary">
                                RS.{book.price}
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </div>

            <div class="description">
                <Typography variant="h6">Book Detail</Typography>
                <Typography >{book.description}</Typography>
            </div>
            <CardActions className="buttons">
                <Button size="small" variant="contained" sx={{ backgroundColor: "brown" }} onClick={addToCartHandler} >ADD TO BAG</Button>
                <Button size="small" variant="outlined">WISHLIST</Button>
            </CardActions>
        </Card >
    )
}
