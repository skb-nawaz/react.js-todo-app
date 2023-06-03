import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import { createContext } from 'react'
import { useState } from 'react'

export const server="https://nodejsboy-todoapp.onrender.com"

export const Context = createContext({isAuthenticated:false})

const AppWraper =()=>{
  const [isAuthenticated,setISAuthenticated]=useState(false)
  const [loader,setLoader]=useState(false)
  const [userDetails,setUserDetails]=useState({})

  return (<Context.Provider value={{
    isAuthenticated,
    setISAuthenticated,
    loader,setLoader,
    userDetails,setUserDetails
  }}>
      <App/>
  </Context.Provider>)
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWraper/>
  </React.StrictMode>,
)

export {AppWraper}