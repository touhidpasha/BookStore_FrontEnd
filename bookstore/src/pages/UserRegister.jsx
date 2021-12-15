import React, { useState, useEffect } from "react";
import { Button, TextField, Checkbox, Typography } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link ,useHistory,useNavigate} from "react-router-dom";

import '../css/UserRegister.css'
import logo from "../assets/download.jpeg"
import { NAME_PATTERN1, EMAIL_PATTERN1, PASSWORD_PATTERN1 } from '../utils/regex-patterns'
const UserHelper = require('../contoller/UserHelper')
export default function UserRegister(props) {
    const navigate = useNavigate();

    const [fValue, changeFormValues] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": ""
    });

    const [showRegister, changePage] = useState(true);
    const [showPassword, changeShowPassword] = useState("password")
    const [errorMsg, setErrorMessage] = useState("")
    const [token, setTokenValue] = useState(localStorage.getItem("token"))

    useEffect(() => {
        navigate(token === null ? "/" : "/dashboard")

    }, [token])

    const getFormValues = (event) => {
        setErrorMessage("")
        changeFormValues({
            ...fValue,
            [event.target.name]: event.target.value
        })

        let flag = true;
        switch (event.target.name) {
            case "firstName":
                flag = NAME_PATTERN1.test([event.target.value]);
                break;
            case "lastName":
                flag = NAME_PATTERN1.test([event.target.value]);
                break;
            case "email":
                flag = EMAIL_PATTERN1.test([event.target.value]);
                break;
            case "password":
                flag = PASSWORD_PATTERN1.test([event.target.value]);
                break;
        }

        if (!flag) {
            setErrorMessage("please enter valid " + event.target.name)
        }
    }
    const createUser = (event) => {
        console.log("create user called in userRegister");
        UserHelper.createUser(fValue)
    }

    return (
        <div id="form" >
            <div id="col">
                {/* <img src={logo} alt="wait still loading.."></img> */}
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
                        <span id="E">E</span> <br></br>Create new account</Typography>
                    <br></br>
                </div>
                <form  >
                    <div id="row">
                        <TextField className="textField" sx={{ paddingRight: 2 }} placeholder="First name" label="First name" name="firstName" value={fValue.firstName} onChange={getFormValues}></TextField>

                        <TextField className="textField" placeholder="Last name" label="Last name" name="lastName" value={fValue.lastName} onChange={getFormValues}></TextField>
                    </div>
                    <div id="row" >
                        <TextField className="textField" sx={{ width: 480 }} placeholder="Username" label="email" name="email" value={fValue.email} onChange={getFormValues}></TextField>
                    </div>
                    <div id="row">
                        <TextField className="textField" type={showPassword} sx={{ paddingRight: 2 }} placeholder="Password" label="password" name="password" value={fValue.password} onChange={getFormValues}></TextField>
                        <TextField className="textField" type={showPassword} placeholder="Confirm" label="confirm"></TextField>
                    </div>
                    <div id="row">
                        <Typography sx={{ paddingTop: -2 }} fontSize="12px" fontWeight="0.5px" className="hint">password must contain atleat 8 chars with combination of all chars</Typography>
                    </div>
                    <div id="row">
                        <Checkbox sx={{ marginRight: 1 }} onChange={(e) => changeShowPassword(prev => { return (prev === "password" ? "text" : "password") })}></Checkbox>
                        <Typography sx={{ paddingTop: 1.5 }} id="checkBox">Show password</Typography>
                    </div>
                    <div id="row">
                        <Typography id="error-tag" sx={{ paddingTop: -2, color: "red" }} fontSize="12px" fontWeight="0.5px" className="hint">{errorMsg}</Typography>
                    </div>
                    <div id="row-button">
                        <Button variant="contained" color="primary" component={Link} to="/login" >Login
                        </Button>
                        <Button onClick={createUser} variant="contained" color="primary"  >Create Account</Button>
                    </div>
                </form>
            </div>
        </div >
    )
}