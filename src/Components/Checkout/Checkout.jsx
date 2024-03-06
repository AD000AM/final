import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { UsercartContext } from '../../ShareData/UserCartContext'

export default function Checkout() {
   let data = useParams()

   let {checkoutPayment} = useContext(UsercartContext)

   let validationSchema = Yup.object({
    city:Yup.string().required("City required").matches(/^[\w- ]{3,}$/, "enter valid city"),
        phone:Yup.string().required("phone required").matches(/^01[1250][0-9]{8}$/,"enter valid phone"),
        details:Yup.string().required("Details required").matches(/^[\w- ]{3,}$/, "enter valid details"),

   })


 let formik =  useFormik({
    initialValues:{
        city:"",
        phone:"",
        details:""
    },
    onSubmit: checkPayment,
    validationSchema
   })
   async function checkPayment(val){

   let req = await checkoutPayment(data.id,val)
   if(req.data.status == 'success'){
    window.open(req.data.session.url, "_self")
   }

   }
  return (
    <div className='w-75 mx-auto my-3 '>

        <form onSubmit={formik.handleSubmit}>
           <div>

           <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" placeholder='enter city' name='city' className='form-control mb-3 ' />

           {formik.touched.city && formik.errors.city ? <p className='text-danger'> {formik.errors.city} </p>: '' }
           </div>


           <div>

           <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" placeholder='enter phone' name='phone' className='form-control mb-3 ' />

           {formik.touched.city && formik.errors.phone ? <p className='text-danger'> {formik.errors.phone} </p>: '' }
           </div>

           <div>

           <textarea onChange={formik.handleChange} onBlur={formik.handleBlur}  placeholder='enter Details' name='details' className='form-control mb-3 '></textarea>

           {formik.touched.city && formik.errors.details ? <p className='text-danger'> {formik.errors.details} </p>: '' }
           </div>

           <button type='submit' disabled ={!(formik.isValid && formik.dirty)} className='btn bg-main text-white w-100 d-block'>Pay now <i className='fa-brands fa-cc-visa'></i> </button>
        </form>


        <br />
        <br />
        <br />
        <br />
    
    </div>
  )
}
