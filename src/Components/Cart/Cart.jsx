import React, { useContext, useEffect, useState } from 'react'
import { UsercartContext } from '../../ShareData/UserCartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  let {getUserCart, deletCart,updateCart ,clearCart, setNumsCartItem}= useContext(UsercartContext)
  let [cartData,setCartData] = useState(null)
  let [loading,setLoading] = useState(true)


  useEffect(()=>{getUserData()},[])

 async function getUserData(){
  setLoading(true)
   let req = await getUserCart().catch((err)=>{
    if(err.response.data.statusMsg == 'fail'){
      setCartData(null)
      setLoading(false)
    }
   })
   if(req?.data.status == 'success'){
    setCartData(req.data.data)
    setLoading(false)

   }
  }

 async function removeCartItem(id){
let req = await deletCart(id)
if(req?.data.status == 'success'){
  setCartData(req.data.data)
  setNumsCartItem(req.data.numOfCartItems)


 }
  }

  async function clearCartItem(){
    let req = await clearCart()
    if(req.data.message == 'success'){
      setCartData(null)
    }
  }

  async function updateCartItem(id,count){

    if(count == 0){removeCartItem(id)}
    else{

      let req = await updateCart(id,count)
    if(req?.data.status == 'success'){
      setCartData(req.data.data)
    
    
     }

    }

    
    
  }
  return (
    <div>
      {loading? <div className='loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 bottom-0 start-0 '>
    <span class="loader"></span>
    </div> : <>
    
    {cartData != null ? <div className="container ">
      <button onClick={clearCartItem} className='btn btn-danger float-end '>Empty cart</button>
      <div className="clearfix"></div>

    



      {cartData.products.map((el)=>{
        return <div className='row py-3  border-bottom border-2 align-items-center '>
        <div className='col-md-10'>
          <div className="row">
            <div className="col-md-2">
              <img src={el.product.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-10">
              <h3>{el.product.title}</h3>
              <h5>Price: {el.price} EGP</h5>
              <button onClick={()=>removeCartItem(el.product.id)} className='btn btn-danger btn-sm'>remove <i className='fa-solid fa-trash'></i></button>

            </div>
          </div>
        </div>
        <div className='col-md-2'>
          <span onClick={()=>updateCartItem(el.product.id,el.count+=1)} className='btn btn-success btn-sm'> <i className='fa-solid fa-plus'></i> </span>
          <span className='mx-2'> {el.count} </span>
          <span onClick={()=>updateCartItem(el.product.id,el.count-=1)} className='btn btn-danger btn-sm'> <i className='fa-solid fa-minus'></i> </span>

        </div>

      </div>
      })}
      
      <h2 className='text-main py-3 ps-auto'>total price:{cartData.totalCartPrice} EGP</h2>
      <Link to={"/Checkout/"+cartData._id} className='btn bg-main text-white btn-sm'>Complete booking</Link>

    </div> :
    
    
    <div className="container">
      <div className='alert alert-danger py-5  '>Your Cart is Empty</div>
    </div>
    
    
    }

    <br />
    <br />
    <br />

    
    
    </>}
    </div>
  
  )
}
