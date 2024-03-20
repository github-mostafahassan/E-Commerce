


import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../NAV BAR/Navbar'
import Foter from '../FOTER/Foter'



export default function Layout() {
  return<>

  <Navbar/>
  
  <Outlet/>

  
  
  </>
}
