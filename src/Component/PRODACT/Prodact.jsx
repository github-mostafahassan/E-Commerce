import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeCarousel from "../HOME CAROUSEL/HomeCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import CategoreSlidar from "../categoreSlidar/categoreSlidar";
import { cartContext } from "../CART CONTEXT/CartContext";
import toast from "react-hot-toast";
import Aos from "aos";

export default function Prodact() {


useEffect( ()=>{
Aos.init( {duration : 1300} )
} , [] )

  
  let { addCartContext } = useContext(cartContext);
 

  async function addToCart({id}) {
    let respons = await addCartContext({id});
    
    if (respons?.data?.status === "success") {
      toast.success(" success adding product ");
    } else {
      toast.error("error adding product");
    }

    console.log("x", respons);
  }

  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  useEffect(() => {
    getAllProducts();
    
  }, []);

  let { data, isLoading } = useQuery("getProducts", getAllProducts);

  // console.log(data.data.data);
  if (isLoading) {
    return (
      <div className="vh-100  bg-black  d-flex justify-content-center align-items-center ">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        
        
            <CategoreSlidar  />
          

        <div className="col-md-12 my-1 py-5">
          <HomeCarousel className="pt-5" />
        </div>

        <div  className="prodats  row py-5 gy-2">
          {data?.data.data.map((product, idx) => (
            <div
            
              key={idx}
              className="prdc pb-3 rounded col-lg-3 col-md-6 col-sm-12"
            >
              <Link to={`/ProdactDetails/${product.id}`}>
                <div data-aos="flip-left"  className="product  p-1 rounded text-center">
                  <img
                    className="w-100 rounded-2"
                    src={product.imageCover}
                    alt={product.category.name}
                  />

                  <h4 className="py-2 text-main" rel="h6">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h4>
                  <p>{product.category.name}</p>
                  <div className="d-flex justify-content-between px-2">
                    {product.priceAfterDiscount ? 
                      <span className="d-flex">
                        
                        <p className="text text-decoration-line-through text-danger">
                          {product.price}
                        </p>
                        -
                        <p className="text-info">
                          {product.priceAfterDiscount}
                          <span className="text-info">EGB</span>
                        </p>
                      </span>
                     : 
                      <p className="text-info">
                        {product.price} <span className="text-info">EGB</span>
                      </p>
                    }
                    <span className="d-flex ">
                      <i
                        className="fa-solid fa-star"
                        style={{ color: "#11d611" }}
                      ></i>
                      <p>{product.ratingsAverage}</p>
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => addToCart({id:product.id})}
                className="btn w-100 bg-main text-white"
              >
                <i className="fa-solid fa-plus text-white"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
