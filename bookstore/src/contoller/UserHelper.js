/* ************************************************************************
 * Purpose          :note helper/controller for api call             
 * 
 * @file            : NoteHelper.js
 * @author          : Touhid pasha
 * @version         : 1.0
 * @since           : 9-8-2021
 * 
 **************************************************************************/
const axios = require('axios');
const API = axios.create({
    baseURL: 'http://localhost:5000/',
    credentials: 'include'
})
class UserHelper {
    createUser = async (data) => {
        try {
            const res = await API.post('user', data)
        } catch (err) { console.log(err) }
    }

    loginUser = async (data) => {
        try {
            const res = await API.post("user/login", data)
            localStorage.setItem("token", res.data.token);
            if (res.status === 200)
                return res.data.token;
            else
                return null;

        } catch (err) {
            return null;
        }
    }
    sendOTP = async (email) => {
        try {
            const res = await API.put('user/forgotPassword', { "email": email })
            if (res.status === 200) {
                return true;
            }
            else
                return false;
        } catch (err) {
            return false;
        }
    }

    verifyOTP = async (data) => {
        try {
            const res = await API.post('user/verifyOTP', data)
            if (res.status === 200)
                return true;
            else
                return false;
        } catch (err) {
            return false;
        }
    }

    changePassword = async (data) => {
        try {
            const res = await API.put("user/resetPassword", data)
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = new UserHelper();