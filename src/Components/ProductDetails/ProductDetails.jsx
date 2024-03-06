import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import toast, { Toaster } from 'react-hot-toast';
import { UsercartContext } from '../../ShareData/UserCartContext'

export default function ProductDetails() {
  let {addCart, setNumsCartItem} =  useContext(UsercartContext)
  let param = useParams()
  let [productId, setProductId] = useState('')


useEffect(()=>{
  setProductId(param.id)

},[])
  async function getProductDetails(queryData){

    

return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${queryData.queryKey[1]}`)

  }

 let {data,isLoading} = useQuery(['productdetails', productId], getProductDetails )
 let product = data?.data.data



 async function AddToCart(id){
  let req = await addCart(id)
  if(req?.data.status == 'success'){
    toast.success(req.data.message)
    setNumsCartItem(req.data.numOfCartItems)
  }
  }


 

  return (
    <div>

{isLoading? <div className='loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 bottom-0 start-0 '>
    <span className="loader"></span>
    </div>: product ? <div className='container'>
      <Toaster/>
      
      <div className='row align-items-center '>
        <div className='col-md-4'>
        <OwlCarousel className='owl-theme' loop items={1}>


    

{product?.images?.map((el)=>{
            return <div class='item'>
            <img src={el}  className='w-100'  alt="" />
        </div>
        })}

</OwlCarousel>
          
        </div>
        <div className='col-md-8'>
          <h2>{product.title}</h2>
          <p className='text-muted my-3'> {product.description}</p>
          <h6 className='text-main'> {product.category?.name}</h6>
          <div className='d-flex justify-content-between '>
            <span>{product.price}EGP</span>
            <span> <i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage} </span>
          </div>
          <button onClick={()=>AddToCart(product.id)}  className='btn my-3 bg-main text-white d-blockk w-100'>Add to Cart</button>
        </div>

      </div>
      
      </div> : ''}


    </div>
  )
}
