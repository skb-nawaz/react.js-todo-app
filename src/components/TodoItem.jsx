import React from 'react'

const TodoItem = (props) => {
    const {title,discription,isCompleted,id,
      updateHandler,deleteHandler}=props
    

  



    
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{discription}</p>
        </div>
        <div>
            <input type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)}/>
            <button className='myButton' onClick={()=>deleteHandler(id)}>Delete</button>
        </div>
    </div>
  )
}

export default TodoItem