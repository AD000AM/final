import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Products() {

  let [page,setPage] = useState(1)

function getProducts(queryData){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`)

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

<div className="row g-5">
  {data?.data?.data.map(  (element)=>{
    return <div key={element.id} className='col-md-2'>
    <div className="product">
      <Link to= {'/ProductDetails/' + element.id}>
      
      <img src={element.imageCover} className='w-100' alt="" />
      <h6 className='text-main'> {element?.category?.name} </h6>
      <h5>{element?.title?.split(" ").slice(0,2).join(" ")}</h5>
      <div className='d-flex justify-content-between '>
        <span>{element.price}EGP</span>
        <span> <i className='fa-solid fa-star rating-color'></i>{element.ratingsAverage}</span>
      </div>
      
      
      
      
      </Link>
      <button className='btn bg-main text-white d-blockk w-100'>Add to Cart</button>
    </div>
  </div>
  }  )}
  
</div>

<nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center my-5">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a onClick={()=>(getPages(1))} className="page-link" >1</a></li>
    <li className="page-item"><a onClick={()=>(getPages(2))} className="page-link" >2</a></li>
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>


</div> }
    




    
    </>
  )

  }