import React from "react";
import InfoIcon from "../infoBox/InfoIcon";
import InfoCounter from "../infoBox/InfoCounter";

const InfoCard = ({ title, genderData, ageData, raceData }) => {
  return (
    <div className="tc bg-black-50 dib br3 w-25 pa1 ma2 bw2 shadow-5" >
        <div>
          <p className="tc b f7 ma0" >{title}</p>

          {genderData && 
            <div>
              <InfoIcon icon={genderData} />
              <p className="tc b f7 ma0" >{genderData}</p>
            </div>
          }
          
          {ageData && <InfoCounter number={ageData} />}

          {raceData && 
            <div>
              <InfoIcon continent={raceData} />
              <h2 className="tc b f7 ma0" >{raceData}</h2>
            </div> 
          }

        </div>
      </div>
  )
}

export default InfoCard;
