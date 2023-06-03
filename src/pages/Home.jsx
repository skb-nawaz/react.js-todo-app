import { Context, server } from "../main"
import axios from "axios"
import { toast } from "react-hot-toast"
import TodoItem from "../components/TodoItem"
import { Navigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

export const Home = () => {
  const {loader,setLoader}=useContext(Context)
  const [title,setTitle]=useState("")
  const [discription,setDiscription]=useState("")
  const [userTask,setUserTask]=useState([])
  const [refresh,setRefresh]=useState([false])
  const {isAuthenticated}=useContext(Context)


    const submitHandler=async(e)=>{
      e.preventDefault()
      try{
       const {data} = await axios.post(`${server}/task/new`,
        {title,discription},{withCredentials:true,
        headers:{
          "content-type":"application/json"
        },})
        toast.success(data.Message)
        setRefresh(pre=>!pre)

      }catch(error){
          toast.error("Task not added")
      }
    }

    useEffect(()=>{
      const data=axios.get(`${server}/task/my`,
      {withCredentials:true}).then((res)=>{
        setUserTask(res.data.task)
        
      })
      .catch((e)=>{
        setUserTask([setUserTask])
      })
    },[refresh])


    const deleteHandler=async(id)=>{
      try{
        const {data}=await axios.delete(`${server}/task/${id}`,{
          withCredentials:true
        })
        toast.success("Is deleted")
        setRefresh(pre=>!pre)
      }catch(e){
        toast.error("failed to delete")
      }
    }


    const updateHandler=async(id)=>{
      try{
        const {data}=await axios.put(`${server}/task/${id}`,{},{
          withCredentials:true
        })
        toast.success("Is updated")
        setRefresh(pre=>!pre)
      }catch(e){
        toast.error("failed to update")
      }
    }
    if(!isAuthenticated){ return <Navigate to="/login"/>}


  return (
    <div className="container">
      <div className="login">
            <section>
            <form onSubmit={submitHandler}>
                <input value={title}   type="text" placeholder="title" onChange={(e)=>{setTitle(e.target.value)}}/>
                <input value={discription} type="text" placeholder="Discription" onChange={(e)=>{setDiscription(e.target.value)}}/>
                <button type="submit" >Submit Task</button>
            </form>
            </section>
        </div>
    <div className="todosContainer">
     
  { userTask.map((ele)=>(
   
   <TodoItem title={ele.title} discription={ele.discription} isCompleted={ele.isCompleted} id={ele._id}
   updateHandler={updateHandler} deleteHandler={deleteHandler}/>

  ))
        
     }
     </div>
    </div>
    
  )
}

export default Home
