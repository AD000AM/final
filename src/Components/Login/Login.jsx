import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../ShareData/UserContext'
import { UsercartContext } from '../../ShareData/UserCartContext'


export default function Login() {
  let {setToken} = useContext(UserContext)
  let {getUserCart,setNumsCartItem} = useContext(UsercartContext)

  let navg = useNavigate()

  let[errMsg,setErr] = useState("")
  let[loading,setloading] = useState(true)
  


  let validationSchema = Yup.object({

    email:Yup.string().required("email required").email("enter valid email"),


    password:Yup.string().matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/,"enter valid password").required("password required"),

  })
  let form1 = useFormik(  {
    initialValues: {
      email: "",
      password: "",
    },
onSubmit:LoginAPi,
validationSchema

  })

 async function LoginAPi(val){
  setloading(false)
   let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',val).catch((errors)=>{
      console.log(errors);
      setErr(errors.response.data.message)
  setloading(true)

    })

    if(req.data.message == 'success'){
      setloading(true)
setToken(req.data.token)
localStorage.setItem("userToken", req.data.token)

getUserData()


      navg('/Home')
      
    }

    console.log(req);

  }

 async function getUserData(){

    let req = await getUserCart().catch((el)=>{})
    if(req?.data.status == "success" ){
      setNumsCartItem(req.data.numOfCartItems)
    }
    
  }


  
  return (
    <div className='container py-5'>
      <h2>Login now......</h2>
      {errMsg!=""? <div className='alert alert-danger '>{errMsg} </div> :""}
      
<form onSubmit={form1.handleSubmit}>
  
<div className='mb-3'>

<label htmlFor="email">email</label>
<input onBlur={form1.handleBlur}  onChange={ form1.handleChange} className='form-control' type="email" name="email" id="email" />


{form1.errors.email && form1.touched.email ? <div className='alert alert-danger '>{form1.errors.email} </div> : ""}
</div>



<div className='mb-3'>

<label htmlFor="password">password</label>
<input onBlur={form1.handleBlur}  onChange={ form1.handleChange} className='form-control' type="password" name="password" id="password" />


{form1.errors.password && form1.touched.password ? <div className='alert alert-danger '>{form1.errors.password} </div> : ""}
</div>


<Link to="/ForgetPassword">ForgetPassword ?......</Link>
<br/>
<br/>

{loading ? <button disabled={!(form1.isValid && form1.dirty)} type='submit'  className='btn  bg-main text-white '>Login</button>: <button type='button' className='btn bg-main text-white '>
  <i className='fa-solid fa-spinner fa-spin'></i>
</button>}





</form>




    </div>
  )
}

