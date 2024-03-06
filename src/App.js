import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import Category from './Components/Category/Category'
import Brands from './Components/Brands/Brands'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import { UserContext, UserContextProvider } from './ShareData/UserContext'
import GuardRouting from './Components/GuardRouting/GuardRouting'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { UsercartContextProvider } from './ShareData/UserCartContext'
import Checkout from './Components/Checkout/Checkout'
import Allorders from './Components/Allorders/Allorders'
export default function App() {

let queryClient= new QueryClient()

let routes = createBrowserRouter([
  {path: "", element:<Layout/>,children:([ 
    {path:"Home", element:<GuardRouting> <Home/></GuardRouting>},
    {path: "Products", element:<GuardRouting><Products/></GuardRouting> },
    {path: "ProductDetails/:id", element:<GuardRouting><ProductDetails/></GuardRouting> },
    {path: "Login", element: <Login/>},
    {path: "forgetpassword", element: <ForgetPassword/>},
    {path: "resetPassword", element: <ResetPassword/>},
    {path: "Category", element:<GuardRouting><Category/></GuardRouting> },
    {path: "Checkout/:id", element:<GuardRouting><Checkout/></GuardRouting> },
    {path: "Allorders", element:<GuardRouting><Allorders/></GuardRouting> },


    {path: "Brands", element:<GuardRouting><Brands/></GuardRouting> },
    {index:true, element: <Register/>},
    {path: "Cart", element:<GuardRouting><Cart/></GuardRouting> },
    {path: "*", element: <Notfound/>},

  
])}
])



  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      <UserContextProvider>
        <UsercartContextProvider>
        <RouterProvider router={routes}/>
        </UsercartContextProvider>
      

      </UserContextProvider>
      </QueryClientProvider>


    </div>
  )
}
