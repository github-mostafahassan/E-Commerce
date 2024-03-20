import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { cartContext } from "../CART CONTEXT/CartContext";
import toast from "react-hot-toast";
import Aos from "aos";

export default function ProdactDetails() {

  useEffect( ()=>{
    Aos.init( {duration : 1300} )
    } , [] )
    

  const [prodactDetel, setprodactDetel] = useState(null);

  let { addCartContext } = useContext(cartContext);

  async function addProdactDetelsCart({ id }) {
    let respons = await addCartContext({ id });

    if (respons?.data?.status === "success") {
      toast.success(" success adding product ");
    } else {
      toast.error("error adding product");
    }

    console.log("x", respons);
  }

  const { id } = useParams();

  async function prodactDetels() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isError, isLoading } = useQuery(
    `betProdactDetels-${id}`,
    prodactDetels
  );

  if (isLoading) {
    return (
      <div
        style={{ background: "rgba(#000, #000, #000, 0.2)" }}
        className="vh-100 bg-black  d-flex justify-content-center align-items-center "
      >
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

  if (isError) {
    return <Navigate to="/prodact" />;
  }

  return (
    <>
      <div className="container py-5">
        <div className="row my-5 py-2 align-items-center shadow rounded-2">
          <div className="col-lg-4 col-sm-12">
            <img
            data-aos="flip-left"
              className="w-100 rounded-pill"
              src={data.data.data.imageCover}
              alt={data.data.data.category.name}
            />
          </div>

          

          <article className="col-lg-8 col-sm-12 ">


            <h2>{data.data.data.title}</h2>
            <p>{data.data.data.category.name}</p>
            <p>{data.data.data.description}</p>

            {data.data.data.priceAfterDiscount ?
              <span className="d-flex">
                <h3 className="text text-decoration-line-through text-danger">
                  {data.data.data.price}
                </h3>
                <h4> : </h4>
                <h3 className="text-info">
                  {data.data.data.priceAfterDiscount}
                  <span className="text-info">EGB</span>
                </h3>
              </span>
              : 
              <h3 className="text-info">
                {data.data.data.price} <span className="text-info">EGB</span>
              </h3>
            }



            <button
              onClick={() => addProdactDetelsCart({ id: data.data.data.id })}
              className="btn w-100 bg-main text-white p-2"
            >
              Add To Cart 
            </button>
          </article>
        </div>
      </div>
    </>
  );
}
