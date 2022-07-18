import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert,list}) => {
  useEffect(()=>{
      const timeout = setTimeout(() =>{
        removeAlert() // yaha remeveAlert function ko call kiye hai qki wo showAlert ke equal hai 
      },3000)
      return () => clearTimeout(timeout)
    },[list]) // jb bhi list change hoga tb yeh rerender hoga
     return <p className={`alert alert-${type}`}>{msg}</p> //yaha pe class banaye h based on type either success or failure
  
}

export default Alert