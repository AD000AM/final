import { Navigate } from "react-router-dom"
import Home from "../Home/Home"
import Login from "../Login/Login"



export default function GuardRouting(props) {
  if(localStorage.getItem("userToken") != null){
    return props.children
  }else{
    return <Navigate to='/Login'/>
  }
}
