import {Context} from "../main"
import { useContext, useEffect } from "react"
import Loader from "../components/Loader"
import { Navigate } from "react-router-dom"

export const Profile = () => {
  const {userDetails,isAuthenticated,setUserDetails}=useContext(Context)
  console.log(userDetails)




  if(!isAuthenticated){ return <Navigate to="/login"/>}
  
  return (
    // loader ?<Loader/>:
    <div>
      <h1>{userDetails.email}</h1>
      <p>{userDetails.name}</p>
    </div>
  )
}

export default Profile