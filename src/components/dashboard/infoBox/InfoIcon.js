import React from "react";
import male from "../../../assets/icons/male.png"
import female from "../../../assets/icons/female.png"

// asian
import asia from "../../../assets/continents/asia.png"
// american indian or alaska native
import northAmerica from "../../../assets/continents/northAmerica.png"
// black or african american
import africa from "../../../assets/continents/africa.png"
// hispanic, latino, or spanish origin
import southAmerica from "../../../assets/continents/southAmerica.png"
//middle eastern or north african
import middleEast from "../../../assets/continents/middleEast.png"
// native hawaiian or pacific islander
import oceania from "../../../assets/continents/oceania.png"
// white 
import europe from "../../../assets/continents/europe.png"

const InfoIcon = ({ icon, continent }) => {

  const checkGender = () => {
    if(icon === "masculine") return male
    if(icon === "feminine") return female
  };

  const checkRace = () => {
    if(continent === "asian") return asia
    if(continent === "american indian or alaska native") return northAmerica
    if(continent === "black or african american") return africa
    if(continent === "hispanic, latino, or spanish origin") return southAmerica
    if(continent === "middle eastern or north african") return middleEast
    if(continent === "native hawaiian or pacific islander") return oceania
    if(continent === "white") return europe
  };

  return (
    <div>
      {icon && <img alt="gender" src={checkGender()} style={{width: "128px", height: "auto"}} />}
      {continent && <img alt="continent" src={checkRace()} style={{width: "256px", height: "auto"}} />}
    </div>
  )
}

export default InfoIcon;
