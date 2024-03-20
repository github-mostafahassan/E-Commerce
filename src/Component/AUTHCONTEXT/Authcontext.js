

import React, { createContext, useEffect, useState } from 'react'


export let context = createContext()
  
  
export default function AuthcontextProvider({children}) {
  
  const [token, settoken] = useState(null);

  const [userData, setUserData] = useState(null)

  


  
  useEffect(()=>{
    settoken(localStorage.getItem('tokn'))
  },[])
  

  return <context.Provider value={{ token , settoken , userData , setUserData }}>
  
  {children}
  
  </context.Provider>
}


