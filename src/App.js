


import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom"
import Layout from './Component/LAY OUT/Layout'
import Regestar from './Component/REGESTAR/Regestar.jsx'
import Login from './Component/LOGIN/Login'
// import Home from './Component/HOME/Home.jsx'
import Notfound from './Component/NOT FOUND/Notfound.jsx'
import AuthcontextProvider from './Component/AUTHCONTEXT/Authcontext.js'
import Categoris from './Component/CATEGORES/Categoris.jsx'
import ProtectedRoute from './Component/PROTECTED ROUTE/ProtectedRoute.jsx'
import Brands from './Component/BRANDS/Brands.jsx'
import Prodact from './Component/PRODACT/Prodact.jsx'
// import Profile from './Component/PRODACT/Prodact.jsx'
import { QueryClient,  QueryClientProvider } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';


import Cart from './Component/CART/Cart.jsx'
import ProdactDetails from './Component/PRODACT DETAILS/ProdactDetails.jsx'
import CartContextProvaider from './Component/CART CONTEXT/CartContext.jsx'
import Profile from './Component/PROFILE/Profile.jsx'
import Order from './Component/ORDER/Order.jsx'
import Allorders from './Component/ALL ORDARS/Allorders.jsx'














const myRouter = createHashRouter([
  

  {path : "/"  , element : <Layout/> , children : [
    
    
    { path : "" , index:true , element : <Regestar/> } ,
    
    {path : "Regestar" ,  element : <Regestar/> } ,

    
    {path : "Login"  ,  element : <Login/> },
    
    { path : "Prodact"  ,  element : <ProtectedRoute>  <Prodact/>  </ProtectedRoute> },

    {path : "ProdactDetails/:id"  , element : <ProtectedRoute>  <ProdactDetails/>  </ProtectedRoute> },
  
    
  {path : "Categoris"  , element :<ProtectedRoute>  <Categoris/>  </ProtectedRoute>},
  
  {path : "Cart"  , element : <ProtectedRoute>  <Cart/>  </ProtectedRoute> },

  {path : "Profile"  , element : <ProtectedRoute>  <Profile/>  </ProtectedRoute> },

  {path : "payment"  , element : <ProtectedRoute>  <Order/>  </ProtectedRoute> },

  
  {path : "Brands"  , element : <ProtectedRoute>  <Brands/>  </ProtectedRoute> },

  
  {path : "*"  , element : <Notfound/> },
  
  
]}

])



export default function App() {
  
  const myClient = new QueryClient()

  return <>
  
  <QueryClientProvider client={myClient}>
    
    <CartContextProvaider>
    
          <AuthcontextProvider>
            
            <RouterProvider  router={ myRouter }/>
            <Toaster/>

          </AuthcontextProvider>
  
      </CartContextProvaider>
  
  </QueryClientProvider>
  
  
  </>
}
