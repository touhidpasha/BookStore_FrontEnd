import React, { useState } from "react";
import { Button, TextField, Checkbox, Typography } from "@mui/material";
import {Link } from "react-router-dom"

import '../css/UserRegister.css'
import logo from "../assets/download.jpeg"
const UserHelper = require('../contoller/UserHelper')

export default function ResetPassword(props) {
    const [fValue, changeFormValues] = useState({
        "OTP": "",
        "password": "",
        "confirmPassword": ""

    });
    const [showPassword, changeShowPassword] = useState("password")
    const [rightOTP, changePage] = useState(false);
    const [errorMsg, setErrorMessage] = useState({
        "OTPerrorMsg": "",
        "PAWDerrorMsg": ""
    })

    const getFormValues = (event) => {
        changeFormValues({
            ...fValue,
            [event.target.name]: event.target.value
        })
        console.log(fValue);
    }
    const verifyOTP = () => {
        changePage(UserHelper.verifyOTP({ "OTP": fValue.OTP, "email": props.email }))
        if (rightOTP !== true)
            setErrorMessage({ ...errorMsg, "OTPerrorMsg": " wrong OTP" })
    }

    const changePassword = () => {
        if (fValue.password === fValue.confirmPassword)
            UserHelper.changePassword({ "email": props.email, "password": fValue.password })
        else
            setErrorMessage("both are not matching")
    }


    if (rightOTP === false) {
        return (
            <div id="form" >
                <div id="col">
                    {/* <img src={logo} alt="wait still loading.."></img> */}
                    {/* <img src={require("../assets/download.jpeg")} alt="wait still loading.."></img> */}

                </div>
                <div id="col">
                    <div id="row" >
                        <Typography fontSize="30px">
                            <span id="F"> F</span>
                            <span id="U">U</span>
                            <span id="N">N</span>
                            <span id="D">D</span>
                            <span id="O">O</span>
                            <span id="N">N</span>
                            <span id="OO">O</span>
                            <span id="T">T</span>
                            <span id="E">E</span>
                            <span id="S">S</span> <br></br></Typography>
                        <br></br>

                    </div>
                    <form >

                        <div id="row" >
                            <TextField className="textField" sx={{ width: 480 }} placeholder="Username" label="OTP" name="OTP" value={fValue.OTP} onChange={getFormValues}></TextField>
                        </div>
                        <div id="row-button">
                            <Button onClick={verifyOTP} variant="contained" color="primary">send</Button>
                        </div>
                        <div id="row">
                            <Typography id="error-tag" sx={{ paddingTop: -2, color: "red" }} fontSize="12px" fontWeight="0.5px" className="hint">{errorMsg.OTPerrorMsg}</Typography>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
    else
        return (
            <div id="form" >
                <div id="col">
                    <img src={logo} alt="wait still loading.."></img>
                </div>
                <div id="col">
                    <div id="row" >
                        <Typography fontSize="30px">
                            <span id="F"> F</span>
                            <span id="U">U</span>
                            <span id="N">N</span>
                            <span id="D">D</span>
                            <span id="O">O</span>
                            <span id="N">N</span>
                            <span id="OO">O</span>
                            <span id="T">T</span>
                            <span id="E">E</span>
                            <span id="S">S</span> <br></br></Typography>
                        <br></br>

                    </div>
                    <form>
                        <div id="row">
                            <TextField className="textField" type={showPassword} sx={{ paddingRight: 2 }} placeholder="Password" label="password" name="password" value={fValue.password} onChange={getFormValues}></TextField>
                        </div>
                        <div id="row">
                            <TextField className="textField" type={showPassword} sx={{ paddingRight: 2 }} placeholder="confirm Password" label="confirm password" name="confirmPassword" value={fValue.confirmPassword} onChange={getFormValues}></TextField>
                        </div>
                        <div id="row">
                            <Checkbox sx={{ marginRight: 1 }} onChange={(e) => changeShowPassword(prev => { return (prev === "password" ? "text" : "password") })}></Checkbox>
                            <Typography sx={{ paddingTop: 1.5 }} id="checkBox">Show password</Typography>
                        </div>
                        <div id="row-button">
                            <Button onClick={changePassword} variant="contained" color="primary" component={Link} to="/login">submit</Button>
                        </div>
                        <div id="row">
                            <Typography id="error-tag" sx={{ paddingTop: -2, color: "red" }} fontSize="12px" fontWeight="0.5px" className="hint">{errorMsg.PAWDerrorMsg}</Typography>
                        </div>
                    </form>
                </div>
            </div>
        )
}