
import cartCss from "./cart.module.css"
import Aos from "aos";



import React, { useContext, useEffect, useState  } from "react";

import { cartContext } from "../CART CONTEXT/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  

  const  { getCartProdacts,  removeCart , updateCunte , clearCart  , Cart } = useContext( cartContext ); 


      

    useEffect ( ()=> {
      getCartProdacts();
      Aos.init()
    } , [] );



        async function deletProduct(id) {
          await removeCart(id);
        }



          async function ubdateMyProduct( id , NewCount ) {
            await updateCunte(id , NewCount);
          }


          
  



  

  return (
    <>
        
          {Cart?.data?.totalCartPrice === 0 ? (
            <div className="container my-5">
              <div className="row my-5"><div className=" my-5 alert alert-danger  text-center">
              <h2 className=""> No Product In Car </h2>
            </div></div>
            </div>
            
          ) : (
          <section className="py-5 mt-5 container">

          <button onClick={  clearCart  } className="w-100 p-1 btn btn-danger">CLEAR CART</button>

          {Cart?.data?.products.map((productCart, inx) => {
            return (
              <div
                data-aos="flip-left"
                key={inx}
                  className={cartCss.cartProdact + "  shadow px-2 rounded py-3 my-5 position-relative"}>
                  <div className="row my-3 justify-content-center align-items-center ">
                
                  <div className="col-md-2">
                  <img
                      className=" w-100 rounded-pill"
                      src={productCart.product.imageCover}
                      alt={productCart.product.category.name}
                    />
                  </div>
                  <div className="col-md-8 ">
                  <div className={cartCss.average + " position-absolute top-0 end-0 pt-3 px-2 col-lg-3 col-md-12 text-center text-white d-flex justify-content-center align-items-center  rounded-start" }>
                    <p >Ratings Average : <i className="fa-solid fa-star " style={{color: "#a9d605"}}></i> {productCart.product.ratingsAverage}</p></div>
                    <h2 className="text-main">{productCart.product.title}</h2>
                    <h5>{productCart.product.category.name}</h5>
                    <p className="d-flex justify-content-between">
                      <span className="f fw-bolder text-info">
                        {productCart.price} EGB
                      </span>
                      <span></span>
                    </p>

                    <p>
                      <span className="fw-bolder">total price </span> :
                      {productCart.price * productCart.count}
                    </p>
                  </div>

                  <div className="col-md-2 text-center ">
                    <button  onClick={() => deletProduct(productCart.product.id)} className="btn bg-danger  text-white mb-1"><i className="fa-solid pe-1 fa-trash"></i>remove</button>
                    <div className="d-flex align-items-center justify-content-center">
                      <button onClick={() => ubdateMyProduct( productCart.product.id, productCart.count - 1 ) } className="btn bg-main text-white mx-2" > - </button> 
                      <span> {productCart.count} </span> 
                      <button onClick={() => ubdateMyProduct( productCart.product.id, productCart.count + 1 ) } className="btn bg-main text-white mx-2" > + </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className=" ">
            <Link to={"/payment"} className="btn bg-main w-100 text-white"> Place Order </Link>

            <p className=" mt-2 fs-5 p-2 px-2 rounded fw-bold">
              Total Cart Price :
              <span  className="text-info px-2 col-md-12 ">
                {Cart?.data?.totalCartPrice} EGB
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
}


