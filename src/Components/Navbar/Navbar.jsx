import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../freshcart-logo.svg'
import { UserContext } from '../../ShareData/UserContext'

import { UsercartContext } from '../../ShareData/UserCartContext'
export default function Navbar() {
  let {userToken ,setToken} =  useContext(UserContext)
  let {numsCartItem} = useContext(UsercartContext)
  let navg = useNavigate()
  function logOut(){
    localStorage.removeItem("userToken")
    setToken(null)
    navg("/Login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to='Home'>
      <img src={logo} alt="" />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {userToken != null ? 
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
    
    <li className="nav-item">
      <NavLink className="nav-link" to= 'Home'>Home</NavLink>
    </li>

    <li className="nav-item">
      <NavLink className="nav-link" to= 'Products'>Products</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to= 'Category'>Category</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to= 'Cart'>Cart</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to= 'Brands'>Brands</NavLink>
    </li>

    
    
  </ul>: "" }
      
      

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    
        

        {userToken != null ? <>
        

          <li className="nav-item position-relative ">
           <NavLink to='/cart'>
           <li className='fa-solid fa-cart-shopping text-main nav-link'></li>
            <span className='position-absolute top-0  end-0  translate-middle-y '>{numsCartItem}</span>
           </NavLink>
          
        </li>
        
          <li className="nav-item">
          <span className="nav-link cursor-pointer" onClick={logOut}>Logout</span>
        </li>
        </>  : <>
        <li className="nav-item">
          <NavLink className="nav-link" to= 'Login'>Login</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to= '/'>Signup</NavLink>
        </li>
        </> }
        

        

        
        
      </ul>
    </div>
  </div>
</nav>
  )
}
