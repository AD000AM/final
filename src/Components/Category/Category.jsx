import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Category() {

  let [page,setPage] = useState(1)

function getProducts(queryData){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories")

}

let {data, isLoading, isError, error, isFetching} =  useQuery(['products',page],getProducts)

function getPages(pageNumber){
  setPage(pageNumber)
}

  return (
    <>
    {isLoading? <div className='loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 bottom-0 start-0 '>
    <span class="loader"></span>
    </div> : <div className='container py-5 '>

<div className="row g-5  ">
  {data?.data?.data.map(  (element)=>{
    return <div className='col-md-4 '>
    <div className="product">
      
      
      <img src={element.image} className='w-100 spc' alt="" />
      <h3 className='text-main text-center '> {element?.name} </h3>
      
      
    </div>
  </div>
  }  )}
  
</div>

</div> }
       
    </>
  )

  }