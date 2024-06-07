import { get } from "lodash";
import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";
import { FaShower } from "react-icons/fa";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  if (isLoading)
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like Button */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexColCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: '"1.5rem'}}>
                $ {data?.price}
              </span>
            </div>


            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72"/>
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility"></div>
              <div className="flexStart facility"></div>
            </div>
          </div>




          <div className="flexColStart right">
            this is  the right side
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default Property;
