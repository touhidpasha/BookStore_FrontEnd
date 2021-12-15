import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import Image from 'material-ui-image'
import { Link } from 'react-router-dom'

import '../css/OrderedItem.css'
import image from "../assets/Group 4132.svg"
import Header from './Header';

export default function OrderedItem(props) {
    return (
        <>
            <Header />

            <div class="main" >

                <img src={image} alt="loading..." style={{ "width": '40%', "height": '300px', 'paddingBottom': "30px" }}></img>
                <div>
                    <Typography>hurray!!! your order is confirmed the order </Typography>
                    <Typography>id is #123456 save the order id </Typography>
                    <Typography> for further communication..</Typography>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email us</TableCell>
                                <TableCell >Contact us</TableCell>
                                <TableCell >Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    admin@bookstore.com
                                </TableCell>
                                <TableCell >admin@bookstore.com</TableCell>
                                <TableCell >42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" component={Link} to={"/dashBoard"}> CONTINUE SHOPPING</Button>
            </div>
        </>
    )

}