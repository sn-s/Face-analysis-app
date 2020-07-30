import React from "react";
import  { Breakpoint } from 'react-socks';

import './ImageBox.css';
import MobileInfoBox from "../mobileInfoBox/MobileInfoBox";

const paddingAdjustment = 15;

const ImageBox = ({ imageUrl, multiBox, nameData, getIdFromImage, infoState }) => {
  const { genderData, ageData, raceData } = infoState;

  const checkNameValue = (name) => {
    if(name.value > 0 && name.value <= 0.2) return "#ff4136"
    if(name.value > 0.2 && name.value <= 0.4) return "#ff6300"
    if(name.value > 0.4 && name.value <= 0.6) return "#ffd700"
    if(name.value > 0.6 && name.value <= 0.8) return "#357edd"
    if(name.value > 0.8 && name.value <= 1) return "#19a974"
  }

  const checkName = (name) => {
    if(name.length === 1) return "25px"
    if(name.length > 1 && name.length < 5) return "15px"
    if(name.length > 4) return "12.5px"
  }

  const styleFunc = (data) => {
    return {
      fontSize: checkName(nameData),
      color: checkNameValue(data)
    }
  }

  const scrollFunc = () => {
    document.getElementsByClassName("title-box")[0].scrollIntoView()
  }

  return (
    <>
      <Breakpoint customQuery="(max-width: 800px)" >
        <MobileInfoBox
          genderData={genderData}
          ageData={ageData} 
          raceData={raceData} 
        />
      </Breakpoint>
      <div className="image-style">
      {imageUrl && 
      <img
        className="image-box br3 ba b--white-50 shadow-5"
        onLoad={() => scrollFunc()}
        id="inputImage" alt="" 
        src={imageUrl} 
        width="515px" 
        height="auto" />}

        {multiBox && 
          multiBox.map(item => (
            <div 
              key={item.id}
              className="bounding-box" 
              style={{
                top: item.boundingBox.topRow + paddingAdjustment, 
                right: item.boundingBox.rightCol + paddingAdjustment, 
                bottom: item.boundingBox.bottowRow + paddingAdjustment, 
                left: item.boundingBox.leftCol + paddingAdjustment
              }} 
              onMouseOver={() => getIdFromImage(item.id)}>
            </div>
        ))}

        {nameData && 
          nameData.map(item => (            
          <div 
            key={item.id} 
            className="name-bounding-box" 
            style={{
              top: item.boundingBox.topRow + paddingAdjustment, 
              right: item.boundingBox.rightCol + paddingAdjustment, 
              bottom: item.boundingBox.bottowRow + paddingAdjustment, 
              left: item.boundingBox.leftCol + paddingAdjustment
            }}>
            <p 
              id="name-text"
              className="name-box yellow" 
              style={styleFunc(item.name)} >
              {item.name.name}</p>
          </div>
        ))}
      </div>   
    </>
  )
}

export default ImageBox;
