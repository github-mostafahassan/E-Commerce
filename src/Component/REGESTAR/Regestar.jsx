
import regestarCss from './regestar.module.css'


import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";

export default function Regestar() {



    let myNavigate =  useNavigate()

  const [isSucces, setisSucces] = useState(false)

  const [isLoding, setisLoding] = useState(false)

  const [isError, setIsError] = useState(undefined);

  // let navigate = Navigate()

  const usedeta = {
    name: "",

    email: "",

    phone: "",

    password: "",

    rePassword: "",
  };

  async function onSubmit(values) {


    setisLoding(true)

    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

      .then(function (x) {
        setisSucces(true);
        setisLoding(false)
        setTimeout(() => {
          
        setisSucces(false);
        myNavigate("/Login")
      }, 3000);
      })
      
    
      .catch(function (x) {

        setIsError(x.response.data.message);
        setisLoding(false)
        setTimeout(function(){
          
          setIsError(undefined)
        } , 3500)
      });
  }

  const myFormik = useFormik({
    initialValues: usedeta,

    onSubmit: onSubmit,

    validate: function (values) {
      const errors = {};

      const nameRejex = /^[A-Z][a-z]{5,12}$/;

      const phoneRejex = /^01[125][1-9]{8}$/;

      if (nameRejex.test(values.name) === false) {
        errors.name = "Name must be from 5 to 18 characters starts with capital lettar";
      }

      if ( values.email.includes("@") === false && values.email.includes(".") === false)
      {
        errors.email = "email must be in format ";
      }

      if (phoneRejex.test(values.phone) !== true) {
        errors.phone = "phone must be an egyptian numpar";
      }

      if (values.password.length < 8 || values.password.length > 12) {
        errors.password = "Password must be from 8 to 12 character";
      }

      if (values.rePassword !== values.password) {
        errors.rePassword = "Password and repassword dont match";
      }
      
      return errors;
    },
  });

  return (
    <>

      <div className="p-5">


      <div className="w-75 m-auto p-3 mt-5 ">

            {isSucces ? <div className="alert alert-info text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>: ""}

            {isError ? <div className="alert alert-danger text-center">{isError}</div> : ""}

            <h2 className=' fw-bold'>Regestar Now</h2>

            <form className={regestarCss.form + " p-3 "} onSubmit={myFormik.handleSubmit}>
              {/* <label htmlFor="name">Name :</label> */}
              <input id="name" placeholder='Name' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text" className="form-control mb-3" />
              {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger mb-3">{myFormik.errors.name}</div>: ""}

              {/* <label htmlFor="email">email :</label> */}
              <input id="email" placeholder='Email' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" className="form-control mb-3" />
              {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger mb-3">{myFormik.errors.email}</div>: ""}


              {/* <label htmlFor="phone">phone :</label> */}
              <input id="phone" placeholder='Phone' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text" className="form-control mb-3" />
              {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger mb-3">{myFormik.errors.phone}</div> : ""}


              {/* <label htmlFor="password">password :</label> */}
              <input id="password" placeholder='Password' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" className="form-control mb-3" />
              {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger mb-3">{myFormik.errors.password}</div> :"" }


              {/* <label htmlFor="rePassword">RePassword :</label> */}
              <input id="rePassword" placeholder='RePassword' onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password" name="rePassword" className="form-control mb-3" />
              {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger mb-3">{myFormik.errors.rePassword}</div>: ""}


              <button type="submit" className="bg-main text-white p-2 btn">
              {isLoding ? <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                  /> : "Regestar "}
              </button>
            </form>
            </div>


      </div>
    </>
  );
}
