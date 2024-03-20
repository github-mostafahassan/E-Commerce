import NavBarCss from "./NavBar.module.css";
import AOS from "aos"
import "aos/dist/aos.css"

import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../IMGES/freshcart-logo.svg";
import { context } from "../AUTHCONTEXT/Authcontext";
import { cartContext } from "../CART CONTEXT/CartContext";

export default function Navbar() {

useEffect( ()=>{
  AOS.init( {duration : 1300} )
},[] )


  
  const naveget = useNavigate();

  const { numOfCartItems  } = useContext( cartContext )

  const { token , settoken } = useContext(context);


  function Loguote() {
    localStorage.setItem("tokn" , null);
    settoken(null);
    naveget("/login");
  }




  return (
    <>
      <nav
        data-aos= "fade-down"
        className={ NavBarCss.nav + " navbar navbar-expand-lg position-fixed top-0 start-0 end-0 z-3 " }
      >
        <div className="container-fluid px-5 py-3">
          <Link className="navbar-brand" text-white to="#">
            <img  src={logo} alt="fresh Cart" />
          </Link>
          <button className="navbar-toggler shadow-none  border-none" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarNav"  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"  >
            <span className="navbar-toggler-icon text-white"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {token ? <ul className="navbar-nav ">

                      <li className="nav-item">
                          <Link className="nav-link active text-white" aria-current="page" to="/Prodact" > Home </Link>
                      </li>

                      <li className="nav-item"> 
                          <Link className="nav-link text-white" to="/Categoris"> Categories </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/Brands"> Brands </Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link text-white position-relative" to="/Cart"> Cart
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                  { numOfCartItems } 
                                    </span>
                        </Link>
                      </li>
                
                    </ul> : " " }

                <ul className="navbar-nav ms-auto align-items-center ">

                    {token  ? <li className="nav-item">
                          <span onClick={ Loguote } role="button" className="nav-link text-white">
                            Logout
                          </span>
                          </li> : <>

                              <li className="nav-item login">
                                <Link className="nav-link text-white" to="/Login" > Login </Link>
                              </li>
                              <li className="nav-item regstar">
                                <Link className="nav-link text-white " to="/Regestar"> Regestar </Link>
                              </li>
                        </> }
                  </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
