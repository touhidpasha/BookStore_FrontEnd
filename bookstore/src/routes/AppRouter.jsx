/* ************************************************************************
 * Purpose          :router for navigation           
 * 
 * @file            : AppROuter.js
 * @author          : Touhid pasha
 * @version         : 1.0
 * @since           : 9-8-2021
 * 
 **************************************************************************/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import UserRegister from '../pages/UserRegister'
import UserLogin from '../pages/UserLogin'
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword"
import DashBoard from "../pages/DashBoard"
import Header from "../components/Header"
import Order from "../components/Order";
import OrderedItem from '../components/OrderedItem'

function AppRouter() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" exact element={<UserRegister />} />
          <Route path="/login" exact element={<UserLogin />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route path="/resetPassword" exact element={<ResetPassword />} />
          <Route path="/dashBoard" exact element={<DashBoard />} />
          <Route path="/order" exact element={<Order />} />
          <Route path="/orderedItem" exact element={<OrderedItem />} />
          {/* <Route path="/header" exact element={<Header />} /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
