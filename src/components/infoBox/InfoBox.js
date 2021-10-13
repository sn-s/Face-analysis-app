import React from "react";
import InfoCard from "./InfoCard";
import "./InfoBox.css";

const InfoBox = ({ infoState }) => {
  const { nameData, genderData, ageData, raceData } = infoState;

  return (
    <div className="info-style mt2 br3 ba b--white-50 shadow-5">
      {genderData ? (
        <>
          <p className="info-name">{nameData}</p>
          <div>
            <InfoCard title="Gender" genderData={genderData} />
            <InfoCard title="Age" ageData={ageData} />
            <InfoCard title="Ethnic origin" raceData={raceData} />
          </div>
        </>
      ) : (
        <div className="lds-dual-ring"></div>
      )}
    </div>
  );
};

export default InfoBox;
