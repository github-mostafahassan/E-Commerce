import axios from "axios";
import React, { createContext,  useEffect,  useState } from "react";

export let cartContext = createContext();

let token = localStorage.getItem("tokn");

console.log(token);

let headers = {
  token,
};

export default function CartContextProvaider({ children }) {
  

  const [numOfCartItems, setnameUfsatItem] = useState(0);
  const [TotalCartPrice , setTotalCartPrice] = useState(0);
  const [Count, setCount] = useState(0)
  const [AllProducts, setAllProducts] = useState(null);
  const [Cart, setCart] = useState(null);
  const [CartId, setCartId] = useState(null)
  

// console.log("Count" , Count);

async function getCartProdacts() {
  
  try{
    const { data } = await axios.get( "https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("tokn"),
      },
    }
  );
  setCart(data);
  
  setCartId(data.data._id)
  }

  catch(err){
    console.log("error" , err );
  }
}


useEffect(() => {
  getCartProdacts();
});





  function addCartContext({ id }) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId : id,
        },
        {
          headers,
        })
      .then((res) => res)
      .catch((err) => err);
  }




  function removeCart(id) {
    
    return axios.delete( `https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        
        headers
    }).then( (res)=> {
  
      setAllProducts( res.data.data.products);
      setTotalCartPrice( res.data.data.totalCartPrice);
      setnameUfsatItem( res.data.numOfCartItems);
  
      return true
  
    } ).catch( (err)=> {
      return false
    } )
    
  }





   function updateCunte( id , NewCount) {
     return axios.put( `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count : NewCount,
        },
        {
          headers,

        })
      .then((res) => {
        
        setAllProducts(res.data.data.products);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setnameUfsatItem(res.data.numOfCartItems);
        setCount( NewCount )
        console.log("data" , res.data);
        return true ;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }



  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        console.log("sssssssssssssssssssssssss");
        setAllProducts([]);
        setTotalCartPrice(0);
        setnameUfsatItem(0);
        setCart([])
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }


  return <cartContext.Provider
      value={{
        Cart,
        setCart,
        addCartContext,
        removeCart,
        updateCunte,
        clearCart,
        setnameUfsatItem,
        numOfCartItems,
        setAllProducts,
        setTotalCartPrice ,
        setCartId ,
        CartId ,
        setCount,
        Count,
        getCartProdacts,
      }} >

      {children}
    </cartContext.Provider>
}
