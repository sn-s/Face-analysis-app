import React from "react";
import "./MobileInfoBox.css";
import MobileInfoCard from "./MobileInfoCard";

const MobileInfoBox = ({ genderData, ageData, raceData }) => {

  
  return (
    <div 
      // className="br3 ba b--white-50 w-100 shadow-5 center fr"
      className="info-style w-100"
    >
      {genderData &&
        <div>
          <MobileInfoCard title="Gender" genderData={genderData} />
          <MobileInfoCard title="Age" ageData={ageData} />
          <MobileInfoCard title="Ethnic origin" raceData={raceData} />

          {/* <p>Icons made by Freepik from www.flaticon.com; Marvdrock and Ted Grajeda from www.thenounproject.com</p> */}
        </div>}
    </div>
  )
  
}

export default MobileInfoBox;
