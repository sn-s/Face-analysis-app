import React from "react";
import InfoIcon from "./InfoIcon";
import InfoCounter from "./InfoCounter";

const InfoCard = ({ title, genderData, ageData, raceData }) => {
  return (
    <div className="tc bg-black-50 dib br3 w-40 pa2 ma3 grow bw2 shadow-5" >
        <div>
          <h2>{title}</h2>

          {genderData && 
            <div>
              <InfoIcon icon={genderData} />
              <h3>{genderData}</h3>
            </div>
          }
          
          {ageData && <InfoCounter number={ageData} />}

          {raceData && 
            <div>
              <InfoIcon continent={raceData} />
              <h2 className="ma0" >{raceData}</h2>
            </div> 
          }

        </div>
      </div>
  )
}

export default InfoCard;
