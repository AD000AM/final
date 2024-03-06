import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {

  let navg = useNavigate()

  let[errMsg,setErr] = useState("")
  let[loading,setloading] = useState(true)


  let validationSchema = Yup.object({
    name:Yup.string().required("name required").min(2,"min char 2").max(20, "max char 20"),

    email:Yup.string().required("email required").email("enter valid email"),

    phone:Yup.string().matches(/^01[1025][0-9]{8}$/, "enter valid phone").required("phone required"),

    password:Yup.string().matches(/^[A-Z][a-z0-9A-Z!@#$%^&*()-_]{6,16}$/,"enter valid password").required("password required"),

    rePassword:Yup.string().oneOf([Yup.ref("password")], "confirm password not matches").required("password required")
  })
  let form1 = useFormik(  {
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
onSubmit:registerApi,
validationSchema
// validate: function(data){
//   let err = {}

//   if(data.name == ""){
//     err.name = "name required"
//   }else if(data.name.length > 10){
//     err.name = "max char 10"
//   }

//   if(data.email == ""){
//     err.email = "email required"
//   }

//   return err
// }

  })

async function registerApi(value){
  setloading(false)
let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',value).catch( function(errors){
  setErr(errors.response.data.message)
  setloading(true)
})
if(req.data.message == 'success'){
  setloading(true)
  navg('/Login')
}

console.log(req);

}

  
  return (
    <div className='container py-5'>
      <h2>Register now......</h2>
      {errMsg!=""? <div className='alert alert-danger '>{errMsg} </div> :""}
      
<form onSubmit={form1.handleSubmit}>
  <div className='mb-3'>
<label htmlFor="name">Name</label>
<input onBlur={form1.handleBlur} onChange={ form1.handleChange} className='form-control' type="text" name="name" id="name" />



{form1.errors.name && form1.touched.name ? <div className='alert alert-danger '>{form1.errors.name} </div> : ""}

</div>

<div className='mb-3'>

<label htmlFor="email">email</label>
<input onBlur={form1.handleBlur}  onChange={ form1.handleChange} className='form-control' type="email" name="email" id="email" />


{form1.errors.email && form1.touched.email ? <div className='alert alert-danger '>{form1.errors.email} </div> : ""}
</div>

<div className='mb-3'>

<label htmlFor="phone">phone</label>
<input onBlur={form1.handleBlur}  onChange={ form1.handleChange} className={(form1.errors.phone && form1.touched.phone)? 'form-control is-invalid'  :'form-control is-valid '} type="tel" name="phone" id="phone" />

{form1.errors.phone && form1.touched.phone ? <div className='alert alert-danger '>{form1.errors.phone} </div> : ""}

</div>

<div className='mb-3'>

<label htmlFor="password">password</label>
<input onBlur={form1.handleBlur}  onChange={ form1.handleChange} className='form-control' type="password" name="password" id="password" />


{form1.errors.password && form1.touched.password ? <div className='alert alert-danger '>{form1.errors.password} </div> : ""}
</div>

<div className='mb-3'>
<label htmlFor="rePassword">rePassword</label>
<input onBlur={form1.handleBlur}  onChange={ form1.handleChange} className='form-control' type="password" name="rePassword" id="rePassword" />

{form1.errors.rePassword && form1.touched.rePassword ? <div className='alert alert-danger '>{form1.errors.rePassword} </div> : ""}
</div>

{loading ? <button disabled={!(form1.isValid && form1.dirty)} type='submit'  className='btn  bg-main text-white '>Register</button>: <button type='button' className='btn bg-main text-white '>
  <i className='fa-solid fa-spinner fa-spin'></i>
</button>}





</form>




    </div>
  )
}
