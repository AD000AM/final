import axios from "axios";
import { createContext, useState } from "react";

export let UsercartContext = createContext()
export function UsercartContextProvider({children}){
    const baseUrl ="https://ecommerce.routemisr.com/api/v1/cart"
    let [numsCartItem, setNumsCartItem] = useState()

    function getUserCart(){
        let options ={
            headers:{
                token:localStorage.getItem("userToken")
            }
        }

        return axios.get(baseUrl,options)

    }

    function addCart(id){
        let options ={
            headers:{
                token:localStorage.getItem("userToken")
            }
        }
        let body={
            productId :id
        }

        return axios.post(baseUrl,body,options)
    }

    function deletCart(id){
        let options ={
            headers:{
                token:localStorage.getItem("userToken")
            }
        }

        return axios.delete(`${baseUrl}/${id}`,options)

    }

    function clearCart(){
        let options ={
            headers:{
                token:localStorage.getItem("userToken")
            }
        }

        return axios.delete(`${baseUrl}`,options)
        
    }

    function updateCart(id,count){
        let options ={
            headers:{
                token:localStorage.getItem("userToken")
            }
        }
let body = {
    count : count
}
        
        return axios.put(`${baseUrl}/${id}`,body,options)

    }

    function checkoutPayment(id, data){
        let options ={
            headers:{
                token:localStorage.getItem("userToken")
            }
        }
let body = {

        shippingAddress:data
    
}
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,body,options)

    }
    

    return <UsercartContext.Provider value={{checkoutPayment, setNumsCartItem, numsCartItem, getUserCart,addCart,deletCart,clearCart,updateCart}} >
        {children}
    </UsercartContext.Provider>
}