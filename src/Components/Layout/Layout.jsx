import React, {useContext, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../ShareData/UserContext'
import { UsercartContext } from '../../ShareData/UserCartContext'

export default function Layout() {

  let {setToken} = useContext(UserContext)
 let {getUserCart,setNumsCartItem} =  useContext(UsercartContext)
useEffect(()=>{
  if(localStorage.getItem("userToken") != null){

    setToken(localStorage.getItem("userToken"))

    getUserData()
  
  }
},[])
async function getUserData(){

  let req = await getUserCart().catch((el)=>{})
  if(req?.data.status == "success" ){
    setNumsCartItem(req.data.numOfCartItems)
  }
  
}


  return (
    <div>
        <Navbar></Navbar>
        <div className='py-5 my-5'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
