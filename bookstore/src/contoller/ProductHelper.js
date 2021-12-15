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
    // credentials: 'include'
})
class ProductHelper {

    getAllProducts = async (info) => {
        // console.log("in helper "+info.index);
        const res = await API.post("product/getProduct", info)
        // console.log("in controller "+JSON.stringify(res));
        return res;
    }
    addToCart = async (info) => {

        const res = await API.post("cart/createCart", info)
        console.log("info " + JSON.stringify(info));
        // console.log("after adding cart " +JSON.stringify(res));
    }
    getAllCartItems = async (info) => {
        return (await API.post("cart/getCart", info))
    }
    getBookDetails = async (info) => {
        const res = await API.post("product/getOneProduct", info)
        console.log("in controler " + JSON.stringify(res));
        return (res.data)
    }
    deleteCart = async (info) => {
        await API.post("cart/deleteCart", info)
    }

    updateCart = async (info) => {

       await API.put("cart/updateCart",info)
    }
    getAddress=async (info) => {
         const res=await API.post("address/getAddress",info) 
        //  console.log("address in cont"+ JSON.stringify(res));
         return res.data
    }
    updateAddresses = async (info) => {
        const res=await API.post("address/updateAddress",info)
        console.log(res);
    }
    placeOrder = async (info) => {
        const res=await API.post("order/createOrder",info)
        console.log("after order "+JSON.stringify(res));
    }
    getId= async (info)=> {
        const res=await API.post("order/getId",info)
        return res.data 

    }
}
module.exports = new ProductHelper();