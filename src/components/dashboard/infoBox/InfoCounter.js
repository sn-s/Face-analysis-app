import React from "react";
import CountUp from "react-countup";

const InfoCounter = ({ number }) => {

  const checkAge = () => {
    return Number(number)
  }

  return (
    <div className="f1 pa3" >
      <CountUp end={checkAge()} duration={3} />
    </div>
  )
    
}

export default InfoCounter;
