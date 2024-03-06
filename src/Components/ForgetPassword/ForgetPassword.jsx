import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ForgetPassword() {
   let navg = useNavigate()
    let[errMsg,setErr] = useState("")
    let[loading,setloading] = useState(true)
    let[formstatus,setformstatus] = useState(true)

    let validationSchema = Yup.object({

        email:Yup.string().required("email required").email("enter valid email"),
    
      })
      let validationSchema2 = Yup.object({

        resetCode:Yup.string().required("resetCode required").matches(/^[0-9]{3,6}$/, "enter valid code"),
    
      })
 let form1 =   useFormik({
        initialValues:{
            email:""
        },
        onSubmit:forgotPasswords,
        validationSchema
    })

   async function forgotPasswords(val){
    let req= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",val).catch((err)=>{
        console.log(err);
        setErr(err.response.data.message)
    })
    if(req.data.statusMsg == 'success'){
        setformstatus(false)
    }

    console.log(req);

    }


    let form2 = useFormik({
    initialValues:{
        resetCode:""

    },
    onSubmit:verifyResetCode,
    validationSchema: validationSchema2

    })
   async function verifyResetCode(val){
     let req = await   axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',val).catch((Err)=>{
        setErr(Err.response.data.message)
        })
        if(req.data.status == "success"){
            navg('/ResetPassword')
        }
    }
  return (
    <div className='container py-5 '>
        {errMsg!=""? <div className='alert alert-danger '>{errMsg} </div> :""}

        {formstatus ? <form onSubmit={form1.handleSubmit}>
            <label htmlFor="email">Enter Email</label>
            <input onChange={form1.handleChange} onBlur={form1.handleBlur} className='form-control' type="text" name="email" id="email" />
            {form1.errors.email &&form1.touched.email?<p className='text-danger'>{form1.errors.email}</p>: ""}



            {loading ? <button disabled={!(form1.isValid && form1.dirty)} type='submit'  className='btn  bg-main text-white '>Send Email</button>: <button type='button' className='btn bg-main text-white '>
  <i className='fa-solid fa-spinner fa-spin'></i>
</button>}
        </form> : <form onSubmit={form2.handleSubmit}>
            <label htmlFor="resetCode">Enter reset code</label>
            <input value={form2.values.resetCode} onChange={form2.handleChange} onBlur={form2.handleBlur} type="text" className='form-control' name="resetCode" id="resetCode" />


            {form2.errors.resetCode &&form2.touched.resetCode?<p className='text-danger'>{form2.errors.resetCode}</p>: ""}
            <button type='submit' className='btn bg-main text-white '>Confirm Code ?</button>
        </form> }
        
        
    </div>
  )
}
