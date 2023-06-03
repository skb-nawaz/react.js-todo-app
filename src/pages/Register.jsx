import {useContext, useState} from "react"
import axios from "axios"
import { Context, server } from "../main"
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"

export const Register =()=>{

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const {userDetails,isAuthenticated,loading,setLoader,setISAuthenticated}=useContext(Context)


    const gettingDataOfUser=async(event)=>{ 
        try{
            event.preventDefault()
            setLoader(true)
        if(name!=""|| email!=""|| password!=""){
            const data=await axios.post(`${server}/user/register`,{
                name,email,password
            },{
                headers:{
                    "Content-type":"application/json"
                },
                withCredentials:true,
            })
            toast.success(`Welcome ${name}`)
            setISAuthenticated(true)
            
        }else{
            toast.error("failed to register")
            setISAuthenticated(false)
            console.log("working 2")
        }
       }catch(e){
        toast.error(e.message)
        setISAuthenticated(false)
            
        }
    }

    if(isAuthenticated){ return <Navigate to="/"/>}
    
        
        

        return (
            
                
                <div className="login">
                <section>
                <form onSubmit={gettingDataOfUser}>
                    <label htmlFor="name">Name</label>
                    <input value={name} id="name" type="text" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}}/>
                    <label htmlFor="email">Email</label>
                    <input value={email} id="email" type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <label htmlFor="password">Password</label>
                    <input value={password} id="password" type="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button  className="myButton" type="submit">Register</button>
                </form>
                </section>
            </div>)
            
       
          

    }

  


