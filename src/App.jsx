import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Header} from "./components/Header"
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./main";
import { useContext } from "react";
import { Context } from "./main";



function App() {

  const {setUserDetails,setISAuthenticated,setLoader}=useContext(Context)

  useEffect(()=>{
    setLoader(true)
   axios.get(`${server}/user/myprofile`,{withCredentials:true})
    .then((res)=>{(setUserDetails(res.data.userDetails));
      setISAuthenticated(true)
      setLoader(false)
    })
    
    .catch(()=>{setUserDetails({})
    setISAuthenticated(false)
    setLoader(false)
  })
  },[])



  return <Router>
    <Header/>
  <Routes>
    <Route path="/"  element={<Home/>}/>
    <Route path="/profile"  element={<Profile/>}/>
    <Route path="/login"  element={<Login/>}/>
    <Route path="/Register"  element={<Register/>}/>
  </Routes>
  <Toaster/>
  </Router>
}

export default App
