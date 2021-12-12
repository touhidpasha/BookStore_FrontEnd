// import React from "react";
// import {Card,Button,Typography,CardContent} from "@mui/material"
import Image from "material-ui-image"
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import image from '../assets/download.jpeg'
import "../css/Product.css"

export default function Product(props) {
    // console.log("books " + JSON.stringify(props.book));
    const [book, setBook] = useState(props.book)
    return (

        <Card sx={{ width: '335px', height: "315" }}>

            <Image src={book.image} alt="loading..."></Image>

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

            <CardActions className="buttons">

                <Button size="small" variant="contained" sx={{ backgroundColor: "brown" }}>ADD TO BAG</Button>
                <Button size="small" variant="outlined">WISHLIST</Button>
            </CardActions>
        </Card>
    );
}
