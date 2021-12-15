import React, { useState } from "react";
import { Button, TextField, Checkbox, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import  '../css/UserRegister.css'
import logo from "../assets/download.jpeg"
import ResetPassword from './ResetPassword'
const UserHelper = require('../contoller/UserHelper')

export default function ForgotPassword(props) {
    const [email, getEmail] = useState("");
    const [hasEmailSend, getMailStatus] = useState(false)

    const getEmailHandler = (event) => {
        getEmail(event.target.value)
    }
    const sendOTP = async () => {
         getMailStatus(await UserHelper.sendOTP(email))
        console.log("email status "+hasEmailSend);
    }

    if (hasEmailSend !== true)
        return (
            <div id="form" >
                <div id="col">
                    {/* <img src={require("../assets/download.jpeg")} alt="wait still loading.."></img> */}
                </div>
                <div id="col">
                    <div id="row" >
                        <Typography fontSize="30px">
                        <span id="F"> B</span>
                        <span id="U">O</span>
                        <span id="N">O</span>
                        <span id="D">K</span>
                        <span id="O">S</span>
                        <span id="N">T</span>
                        <span id="OO">O</span>
                        <span id="T">R</span>
                        <span id="E">E</span> <br></br></Typography>
                        <br></br>

                    </div>
                    <form >
                        <div id="row" >
                            <TextField className="textField" sx={{ width: 480 }} placeholder="Username" label="email" name="email" value={email} onChange={getEmailHandler}></TextField>
                        </div>
                        <div id="row-button">
                            <Button onClick={sendOTP} variant="contained" color="primary">GET OTP</Button>
                        </div>
                    </form>
                </div>
            </div >
        )
    else
        return (
            <ResetPassword email={email}></ResetPassword>
        )
}