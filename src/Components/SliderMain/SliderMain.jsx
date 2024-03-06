import React, { useEffect } from 'react'
import img1 from '../../41nN4nvKaAL._AC_SY200_.jpg'
import img2 from '../../XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img3 from '../../XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'

import img4 from '../../XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img5 from '../../61cSNgtEISL._AC_SY200_.jpg'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function SliderMain() {

  return (
    <div className='mb-5'>

        <div className='row g-0 '>

            <div className='col-md-9'>
            <OwlCarousel className='owl-theme' loop items={1}>
    <div class='item'>
        <img src={img1}  className='w-100' height={400} alt="" />
    </div>

    <div class='item'>
        <img src={img2}  className='w-100' height={400} alt="" />
    </div>

    <div class='item'>
        <img src={img5}  className='w-100' height={400} alt="" />
    </div>
</OwlCarousel>;
            </div>
            <div className='col-md-3' >
            <img src={img4} className='w-100' height={200} alt="" />
            <img src={img3} className='w-100' height={200} alt="" />
            </div>
        </div>
    </div>
  )
}
