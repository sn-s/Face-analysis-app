import React from "react";
import InfoIcon from "./InfoIcon";
import InfoCounter from "./InfoCounter";

const InfoCard = ({ title, genderData, ageData, raceData }) => {
  return (
    <div className="tc bg-black-50 dib br3 w-30 w-40-ns pa2 ma3 grow bw2 shadow-5" >
        <div>
          <p className="b f4 f3-ns ma0 ma3-ns" >{title}</p>

          {genderData && 
            <div>
              <InfoIcon icon={genderData} />
              <p className="b f4 f3-ns ma0 ma3-ns" >{genderData}</p>
            </div>
          }
          
          {ageData && <InfoCounter number={ageData} />}

          {raceData && 
            <div>
              <InfoIcon continent={raceData} />
              <h2 className="b f4 f3-ns ma0" >{raceData}</h2>
            </div> 
          }

        </div>
      </div>
  )
}

export default InfoCard;
