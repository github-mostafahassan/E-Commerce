import brandsCss from "./brands.module.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { date } from "yup";
import Aos from "aos";

export default function Brands() {
  const [brand, setbrand] = useState(null);

  const params = useParams();

  // console.log("paramsBarams" , params);

  async function allBrands() {
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    setbrand(data);
  }

  useEffect(() => {
    allBrands();
    Aos.init()
  },[]);

  const { data , isLoading } = useQuery(  );

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
      <div className="container py-5 text-center">
        <h1 className=" text-success fw-bold pt-5">All Brands</h1>
        <div className="row py-5 g-2">
          {brand?.data.map((brnd, inx) => {
            return (
              <div  key={inx} className="col-lg-3 col-md-4 col-sm-12">
                <div
                  key={inx}
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3
                          class="modal-title fs-5 text-info"
                          id="staticBackdropLabel"
                        >
                          {brnd.name}
                        </h3>

                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <img
                        
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          className="w-75"
                          src={brnd.image}
                          alt={brnd.name}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  data-aos="zoom-in"
                  className={brandsCss.innar + " text-center border rounded"}
                >
                  <figure>
                    
                    <img
                    
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      src={brnd.image}
                      alt={brnd.name}
                    />
                  </figure>
                  <figcaption className="py-3">{brnd.name}</figcaption>
                </div>
              </div>
            );
          })}

          {/* {brand?.data.map( ( brand , inx )=> {
                return 
            }) } */}
        </div>
      </div>
    </>
  );
}
