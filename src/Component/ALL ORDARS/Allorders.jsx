


import React, { useContext } from 'react'
import { cartContext } from '../CART CONTEXT/CartContext'
import axios from 'axios';



export default function Allorders() {

    const { removeCart } =  useContext( cartContext );

    function getAllOrders() {

        axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17" )
        
    }
  return <>
  
<div className="container m-auto mt-5">
    <div className="row">
    <table className='mt-5 text-center'>
  
  <thead className='p-5 bg-secondary rounded-top-2'>
      <tr className='p-5'>
          <th className='py-3 fw-bold text-white'> Img </th>

          <th className='py-3 fw-bold text-white'> Product Name </th>

          <th className='py-3 fw-bold text-white'> Price </th>

          <th className='py-3 fw-bold text-white'> Quntity </th>

          <th className='py-3 fw-bold text-white'> Total Price </th>

          <th className='py-3 fw-bold text-white'> Remove </th>
      </tr>
  </thead>
  <tbody className='py-5'>
      <tr>
          <td width="20%"> <img className='w-50 h-50 py-1' src={require("../images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg")} alt="" /></td>

          <td >Product.Name </td>

          <td width="15%">500</td>

          <td width="15%">
              <div>
                  <button className='btn btn-primary'>-</button>
                  <button className='btn '>2</button>
                  <button className='btn btn-primary'>+</button>
              </div>
          </td>
          <td width="15%">0000000</td>
          <td width="15%"><button onClick={ removeCart } className='btn btn-danger text-white'>Remove</button></td>

          <td>  </td>
      </tr>
  </tbody>


</table>
    </div>
</div>

  
  
  </>
}
