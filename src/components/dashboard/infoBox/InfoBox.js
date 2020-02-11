import React from "react";
import "./InfoBox.css";
import InfoCard from "./InfoCard";

const InfoBox = ({ genderData, ageData, raceData, errorMessage }) => {

  
  return (
    <div 
      className="info-style mt3 br3 ba b--white-50 shadow-5"
    >
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
