import CategoreCSS from "../CATEGORES/Categore.module.css/Categore.module.css"

import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Aos from "aos";


export default function Categoris() {

  useEffect( ()=>{
    Aos.init()
    } , [] )

  const [categore, setCategore] = useState(null)


async function getCategoe() {

  const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")

  console.log("xxxxxxxxxx" , data);

  setCategore(data)

}


useEffect( ()=>{
  getCategoe()
} , [] )

const {data , isLoading } = useQuery( getCategoe )

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
      <h1 className=" text-success fw-bold pt-5">CATEGORES</h1>
        <div className="row gy-2 py-5">

          {categore?.data.map( (categore , inx )=> {

            return <div key={inx} className="col-lg-3 col-md-4 col-sm12">
            <figure data-aos="flip-left" className={ CategoreCSS.innar + " text-center border rounded" }>
              <img style={ { height : " 230px" } }  className="w-100 rounded-top" src={categore.image} alt={categore.name} />
              
              <figcaption className="py-3 fw-bold text-success">
                {categore.name}
              </figcaption>
            </figure>
            
          </div>
          } )}

        
        </div>
      </div>
    </>
  );
}
