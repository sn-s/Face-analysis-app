import React from "react";
import "./InfoBox.css";
import InfoCard from "./InfoCard";

const InfoBox = ({ genderData, ageData, raceData, errorMessage }) => {

  
  return (
    <div className="br3 ba b--white-50 w-100 shadow-5 center" >
      {genderData ?
        <div>
          <InfoCard title="Gender" genderData={genderData} />
          <InfoCard title="Age" ageData={ageData} />
          <InfoCard title="Ethnic origin" raceData={raceData} />
          <p>Icons made by Freepik from www.flaticon.com; Marvdrock and Ted Grajeda from www.thenounproject.com</p>
        </div>
        : <div className="lds-dual-ring"></div>} 
    </div>
  )
  
}

export default InfoBox;
