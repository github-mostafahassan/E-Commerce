import axios from "axios";
import React from "react";
import { Radio, ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function HomeCarousel() {


  async function getCategores() {

    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    
  }
  
  let {data , isLoading} = useQuery("getCategores" , getCategores)
  




if (isLoading) {

  return <div className="d-flex justify-content-center align-items-center position-absolute start-0 end-0 top-0 bottom-0">
  <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
  
}







  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return <>
  

  <Slider className="mb-5 " {...settings}>
        {data.data.data.map( (categore, inx)=> <div className="text-center" key={inx}>
          <img style={ { height : "200px" }} className="w-100" src={categore.image} alt={categore.name} />
          <h6 className="py-3">{categore.name}</h6>
        </div>)}
      </Slider>

  </>
    ;
}



