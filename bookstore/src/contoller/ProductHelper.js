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
        const res = await API.post("product/getProduct",info)
        // console.log("in controller "+JSON.stringify(res));
        return res;
    }

}
module.exports = new ProductHelper();