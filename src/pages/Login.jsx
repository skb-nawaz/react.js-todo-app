
import { Link } from "react-router-dom"
import axios from "axios"
import { server } from "../main"
import { toast } from "react-hot-toast"
import { useState,useContext } from "react"
import { Context } from "../main"
import { Navigate } from "react-router-dom"

 export const Login =()=>{
    const [email,setEmail] =useState("")
    const [password,setPassword]=useState("")

    const {userDetails,isAuthenticated,setISAuthenticated,setLoader,loader}=useContext(Context)

   const  gettingDataOfUser=async(event)=>{
    event.preventDefault()
    setLoader(true)
       try{
       const data= await axios.post(`${server}/user/login`,{email,password},
        {
            headers:{
               "Content-type": "application/json"
            },
            withCredentials:true
        })
        toast.success(`welecome ${userDetails.name}`)
        setISAuthenticated(true)
        setLoader(false)
    
       }catch(e){
        toast(`${e.message}`)
        setISAuthenticated(false)
        setLoader(false)
       }
        
   }
   if(isAuthenticated){ return <Navigate to="/"/>}

    return (
        <div className="login">
            <section>
            <form onSubmit={gettingDataOfUser}>
                <label htmlFor="email">Email</label>
                <input value={email} id="email" type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <label htmlFor="password">Password</label>
                <input value={password} id="password" type="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="myButton" type="submit">Login</button>
                <h4>Or</h4>
                <Link to="/register">Sign Up</Link>
            </form>
            </section>
        </div>
      )
}
  

export default Login