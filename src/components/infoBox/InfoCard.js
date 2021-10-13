import React from "react";
import InfoIcon from "./InfoIcon";

const InfoCard = ({ title, genderData, ageData, raceData }) => {
  const checkRace = (name) => {
    if (name === "Latino_Hispanic") return "South America";
    if (name === "White") return "Europe";
    if (name === "Middle Eastern") return "Middle East";
    if (name === "Indian") return "South Asia";
    if (name === "Black") return "Africa";
    if (name === "East Asian") return "East Asia";
    if (name === "Southeast Asian") return "Southeast Asia";
  };

  const checkGender = (gender) => {
    if (gender === "Masculine") return "Male";
    if (gender === "Feminine") return "Female";
  };

  return (
    <div className="tc bg-black-50 dib br3 w-25-ns pa1 ma2 grow bw2 shadow-5">
      <div>
        <p className="b f4 ma0 ma2-ns">{title}</p>

        {genderData && (
          <div>
            <InfoIcon icon={genderData} />
            <p className="b f4 ma0 ma2-ns">{checkGender(genderData)}</p>
          </div>
        )}

        {ageData && <div className="b tc f3 pa1">{ageData}</div>}

        {raceData && (
          <div>
            <InfoIcon continent={raceData} />
            <h2 className="b f4 ma0">{checkRace(raceData)}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
