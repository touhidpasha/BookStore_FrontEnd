import React, { useState, useEffect } from 'react';
import { Pagination, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
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

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setBooks } = bindActionCreators(actionCreators, dispatch);
    const [page, setPage] = useState(1);
    useEffect(async () => {
        navigate(localStorage.getItem("token") === null ? "/login" : "/dashboard")
        var res = await ProductHelper.getAllProducts({ "index": 4,"sortType":sortType })
        setBooks(res.data, "")
         res = await ProductHelper.getAllProducts({ "index": page-1,"sortType":sortType })
        setBooks(res.data, "")
    }, [page])

    const bookState = useSelector((state) => state.book);//getting from redux
    useEffect(() => {
        console.log("pagr value " + page);
    }, [page]
    )
    const [sortType, setSortBy] = React.useState('high');

    const handleChange = (event) => {
        setSortBy(event.target.value);
        // console.log(sortType);
    };

    return (
        <>
            <Header></Header>
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
                                <MenuItem value={'high'}>price:high to low</MenuItem>
                                <MenuItem value={'low'}>price:low to high</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
            <div class="books">
                {
                    [...bookState['data']].map(book => {
                        return (<Product book={book}></Product>)
                    })
                }
            </div>
            <div class="pagination">
                <Pagination count={5} page={page} onChange={(event, value) => { setPage(value) }}></Pagination>
            </div>
        </>
    )
}