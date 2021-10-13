import React from "react";
import male from "../../assets/icons/male.png";
import female from "../../assets/icons/female.png";

// Black
import africa from "../../assets/continents/africa.png";
// East Asian
import eastAsia from "../../assets/continents/eastAsia.png";
// Latino Hispanic
import southAmerica from "../../assets/continents/southAmerica.png";
// Middle Eastern
import middleEast from "../../assets/continents/middleEast.png";
// South Asian
import southAsia from "../../assets/continents/southAsia.png";
// Southeast Asian
import southeastAsia from "../../assets/continents/southeastAsia.png";
// White
import europe from "../../assets/continents/europe.png";

const InfoIcon = ({ icon, continent }) => {
  const checkGender = () => {
    if (icon === "Masculine") return male;
    if (icon === "Feminine") return female;
  };

  const checkRace = () => {
    if (continent === "Black") return africa;
    if (continent === "East Asian") return eastAsia;
    if (continent === "Latino_Hispanic") return southAmerica;
    if (continent === "Middle Eastern") return middleEast;
    if (continent === "Indian") return southAsia;
    if (continent === "Southeast Asian") return southeastAsia;
    if (continent === "White") return europe;
  };

  return (
    <div>
      {icon && (
        <img
          alt="gender"
          src={checkGender()}
          style={{ width: "60px", height: "auto" }}
        />
      )}
      {continent && (
        <img
          alt="continent"
          src={checkRace()}
          style={{ width: "auto", height: "125px" }}
        />
      )}
    </div>
  );
};

export default InfoIcon;
