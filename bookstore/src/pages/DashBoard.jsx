import React, { useState, useEffect } from 'react';
import { Pagination, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import ProductHelper from '../contoller/ProductHelper'
import Product from '../components/Product';
import Header from '../components/Header';
import * as actionCreators from "../state/action-creators/servent"
import "../css/DashBoard.css"  //servent or methods
import Order from '../components/Order';

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setBooks,setCarts } = bindActionCreators(actionCreators, dispatch);
    const [page, setPage] = useState(0);
    const [sortType, setSortBy] = React.useState('asc');

    useEffect(async () => {
        navigate(localStorage.getItem("token") === null ? "/login" : "/dashboard")
        var res = await ProductHelper.getAllProducts({ "start":48,"end": 51, "sortType": sortType })
        setBooks(res.data, "")
        res = await ProductHelper.getAllProducts({ "start":page*12,"end": page*12+12, "sortType": sortType })
        setBooks(res.data, "")
        var res = await ProductHelper.getAllCartItems({ "token": localStorage.getItem("token") })
        setCarts(res.data)
    }, [page,sortType])
    const bookState = useSelector((state) => state.book);//getting from redux
    
    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const [order, setOrder] = useState(false)
    const [book, setBook] = useState()
    const handleOrderPlace = (order) => {
        setOrder(order)
    }
    const handleOrderedBook = (book) => {
        setBook(book)
    }

    return (
        <>
            <Header></Header>
            {!order ? <>
                <div class="mainHint">
                    <div class="hint">
                        <Typography gutterBottom variant="h4" component="div" sx={{ fontSize: "25px" }}>
                            Books
                        </Typography>
                        <Typography variant="caption" sx={{ paddingTop: "10px", fontColor: "#9D9D9D" }}>(52 items)</Typography>
                    </div>
                    <div class="sort">
                        <Box >
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortType}
                                    label={sortType}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'asc'}>price:asc to desc</MenuItem>
                                    <MenuItem value={'desc'}>price:desc to asc</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
                <div class="books">
                    {
                        [...bookState['data']].map(book => {
                            // setBook(book)
                            return (<Product onOrderPlace={handleOrderPlace} getBookFromChild={handleOrderedBook} book={book}></Product>)
                        })
                    }
                </div>
                <div class="pagination">
                    <Pagination count={5} page={page} onChange={(event, value) => { setPage(value) }}></Pagination>
                </div>
            </> :
                <Order book={book}></Order>
            }
        </>
    )
}