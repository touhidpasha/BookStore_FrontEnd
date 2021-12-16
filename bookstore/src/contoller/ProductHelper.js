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
        const res = await API.post("product/getProduct", info)
        return res;
    }
    addToCart = async (info) => {
        const res = await API.post("cart/createCart", info)
    }
    getAllCartItems = async (info) => {
        return (await API.post("cart/getCart", info))
    }
    getBookDetails = async (info) => {
        const res = await API.post("product/getOneProduct", info)
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
         return res.data
    }
    updateAddresses = async (info) => {
        const res=await API.post("address/updateAddress",info)
    }
    placeOrder = async (info) => {
        const res=await API.post("order/createOrder",info)
    }
    getId= async (info)=> {
        const res=await API.post("order/getId",info)
        return res.data 
    }
}
module.exports = new ProductHelper();