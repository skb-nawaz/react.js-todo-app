import React , { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../main';
import axios from "axios"
import { server } from "../main"
import { toast } from "react-hot-toast"
import { Navigate } from "react-router-dom"

export const Header = () => {
  const {isAuthenticated,setISAuthenticated,loader,setLoader}=useContext(Context)
    
    const logout=async()=>{
      setLoader(true)
      try{
        
       await axios.get(`${server}/user/logout`,{withCredentials:true})
      toast.success("Logged Out")
      setLoader(false)
      setISAuthenticated(false)

      }catch{
        toast.error("Logged failure")
        setLoader(false)
        setISAuthenticated(true)
        
      }
      
    }
    
    // if(isAuthenticated===false){ return <Navigate to="/login"/>}

  return (
    <nav className="header">
        <div>
            <h2>Todo App.</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {isAuthenticated ?<button onClick={logout} className="btn">Logout</button>:<Link to={"/login"}>Login</Link>}
        </article>
    </nav>
  ) 
}

export default Header;