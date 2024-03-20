

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
// import React, { useContext, useEffect } from 'react'
// import { context } from '../AUTHCONTEXT/Authcontext';


export default function Profile() {


  async function userData() {

    const x = await axios.post("")
    
  }
  
  
  // let { userData } = useContext( context );

  
  return <>
  
  <div className=" container py-5">
    <div className="row py-5">



    {/* <h1 className=''>Hello : {userData?.name}</h1>
    <h1 className=''>Hello : {userData?.email}</h1> */}

    </div>
  
  </div>
  </>
}
