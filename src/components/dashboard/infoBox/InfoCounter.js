import React from "react";
import CountUp from "react-countup";

const InfoCounter = ({ number }) => {

  const checkAge = () => {
    return Number(number)
  }

  return (
    <div className="tc f2 f2-m f1-ns  pa3" >
      <CountUp end={checkAge()} duration={3} />
    </div>
  )
    
}

export default InfoCounter;
