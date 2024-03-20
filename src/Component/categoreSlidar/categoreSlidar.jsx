import axios from "axios";
import React from "react";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoreSlidar() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function categres() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b"
    );
  }
  let { data, isLoading } = useQuery("getCategoreSlidar", categres);

  // if (isLoading) {
  //   return (
  //     <div className={ " d-flex vh-100  bg-opacity-50 justify-content-center align-items-center " } >
  //       <ThreeDots
  // visible={true}
  // height="80"
  // width="80"
  // color="#4fa94d"
  // radius="9"
  // ariaLabel="three-dots-loading"
  // wrapperStyle={{}}
  // wrapperClass=""
  // />
  //     </div>
  //   );
  // }

  return <>

  <div className="container mt-5">
      <div className="row justify-content-center  p-1">
      <div className="col-md-4">
            <Slider {...settings}>

            <img height={400}  className="w-100" src={require("../images/61cSNgtEISL._AC_SY200_.jpg")} alt="" />

            <img height={400} className="w-100" src={require("../images/41nN4nvKaAL._AC_SY200_.jpg")} alt="" />

            </Slider>;

      </div>
      <div className="col-md-4">
            <img height={200} className="w-100" src={require("../images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg")} alt="blog" />

            <img height={200} className="w-100" src={require("../images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg")} alt="blog" />
      </div>
      </div>
      
  </div>
  
    
  
  
  </>
  
}
