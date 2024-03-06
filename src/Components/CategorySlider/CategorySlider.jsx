import axios from 'axios'
import React, { useEffect, useState } from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function CategorySlider() {


    let [categoryList,setCategoryList] =useState([])

useEffect(()=> {
    getAllCategory()
}, [])
  async  function getAllCategory(){
        let req = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategoryList(req.data.data)
    }
  return (
    <div>

        <OwlCarousel className='owl-theme' loop items={7}>


    

    {categoryList.map((el)=>{
                return <div key={el.id} className='item'>
                <img src={el.image}  className='w-100' height={200} alt="" />
            </div>
            })}

</OwlCarousel>
    </div>
  )
}
