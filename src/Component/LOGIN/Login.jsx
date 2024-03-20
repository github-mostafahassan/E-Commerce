import LoginCss from "./Login.module.css"



import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import AuthcontextProvider, { context } from "../AUTHCONTEXT/Authcontext";
import { cartContext } from "../CART CONTEXT/CartContext";

export default function Login() {
  // function onSubmit(e){

  //   e.preventDefault()


  // }


  const { settoken , token , setUserData } = useContext( context );

  const [isSucces, setisSucces] = useState(false)

  const [isLoding, setisLoding] = useState(false)

  const [isError, setIsError] = useState(undefined);

  let { setCart } = useContext( cartContext )

  let navigate = useNavigate()

  const usedeta = {
    name: "",

    email: "",

    phone: "",

    password: "",

    rePassword: "",
  };

  async function onSubmit(values) {


    setisLoding(true);

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)

      .then(function (x) {
        

        setisLoding(false);
        setUserData(x.data.user)
        
        settoken(x.data.token)

      localStorage.setItem("tokn" , x.data.token);

        


        setisSucces(true);

        navigate(`/Prodact`)
        
        
        
        setTimeout(() => {
          
        setisSucces(false);
      }, 3000);
      })
      
    
      .catch(function (x) {
        setIsError(x.response.data.message);

          setisLoding(false);
          setTimeout(function(){
          setIsError(undefined);
        } , 3000)
      });
  }

  const myFormik = useFormik({
    initialValues: usedeta,

    onSubmit: onSubmit,

    validate: function (values) {
      const errors = {};


      if ( values.email.includes("@") === false && values.email.includes(".") === false) {
        errors.email = "email must be in format ";
      }

      if (values.password.length < 8 || values.password.length > 12) {
        errors.password = "Password must be from 8 to 12 character";
      }

      return errors;
    },




  });

  return (
    <>
      <div className="pt-5 w-100">


      <div className="w-75 mt-5   m-auto p-5">

        {isSucces ? <div className="alert alert-info text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>: ""}

        {isError ? <div className="alert alert-danger text-center">{isError}</div> : ""}

        <h2 className={LoginCss.Title + " fw-bold"}>Login Now</h2>

        <form className={LoginCss.form + " p-3 "} onSubmit={myFormik.handleSubmit}>

          
          <input id="email" placeholder="Emeil" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" className="form-control mb-3" />
          {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger mb-3">{myFormik.errors.email}</div>: ""}


          
          <input id="password" placeholder="Password" onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" className="form-control mb-3" />
          {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger mb-3">{myFormik.errors.password}</div> :"" }

          <button type="submit" className="bg-main text-white p-2 btn">
            {isLoding ? <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              /> : "Login"}
          </button>
        </form>
        </div>


      </div>
    </>
  );
}

