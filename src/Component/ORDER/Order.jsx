import axios from "axios";
import React, { useContext } from "react";
import { cartContext } from "../CART CONTEXT/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function OrderCash() {

  const nav = useNavigate()

const { CartId } = useContext( cartContext )

  function ConfirmCachPayment() {

    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;


const userData = {
  "shippingAddress":{
      "details": details,
      "phone": phone,
      "city": city ,
      }
}


    
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${ CartId }`,{
      userData
    } , {
      headers : { 
        token : localStorage.getItem("tokn")
      }
    }).then( (res)=> {
      console.log("rese" , res);
      if (res.data.status === "success") {
        toast.success(" Payment Completed Successfoly ");

        setTimeout(() => {
          
          nav("/Prodact")

        }, 1500);
      } 
    } ).catch( ( err )=> {
      console.log("erorr" , err);
      toast.error("ERORR....");
    } )

  }
















  function ConfirmOnlinePayment() {

    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;


const userData = {
  "shippingAddress":{
      "details": details,
      "phone": phone,
      "city": city ,
      }
}


    
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${ CartId }`,{
      userData
    } , {
      headers : { 
        token : localStorage.getItem("tokn")
      } , params : {
        url : "https://localhost:3000"
      }
    }).then( (res)=> {
      console.log("rese" , res);
      if (res.data.status === "success") {

        window.open( res.data.session.url )

      } 
    } ).catch( ( err )=> {
      console.log("erorr" , err);
      toast.error("ERORR....");
    } )

  }
















  return (
    <>
      <div className="py-5">
        <div className="py-3 bg-secondary my-5">
          <div className="container">
            <h1 className=" text-white">Checkout</h1>
          </div>
        </div>

        <div className="py-4 ">
          <div className="container ">
            <div className="row ">
              <div className="col-md-7 m-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row ">
                      <div className="col-md-6">
                        <div
                          className=" form-group md-3"
                        >
                          <label htmlFor="phone">Phone :</label>
                          <input
                            id="phone"
                            type="text"
                            className=" form-control"
                            name="phone"
                            
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className=" form-group md-3">
                          <label htmlFor="city">City :</label>
                          <input
                            id="city"
                            type="text"
                            className=" form-control"
                            name="city"
                            
                          />
                        </div>
                      </div>

                      <div className="col-md-12 mt-3">
                        <div className=" form-group md-3">
                          <label htmlFor="details">details :</label>
                          <textarea
                            className=" form-control"
                            name="details"
                            id="details"
                            cols="30"
                            rows="10"
                            
                          >
                            
                          </textarea>
                        </div>
                      </div>

                      <button onClick={ ConfirmCachPayment } className="btn btn-primary w-25 mt-3 m-auto"> Conffirm Cach Paument </button>
                      <button onClick={ ConfirmOnlinePayment }  className="btn btn-primary w-25 mt-3 m-auto"> Conffirm Online Paument </button>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
