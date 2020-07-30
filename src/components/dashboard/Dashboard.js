import React, { useState, useEffect } from "react";
import  { Breakpoint } from 'react-socks';
import Clarifai from "clarifai";
import "./Dashboard.css";

import DetectBox from "./detectBox/DetectBox";
import Confidence from "./imageBox/confindence";
import ImageBox from "./imageBox/ImageBox";
import InfoBox from "./infoBox/InfoBox";
import Gallery from "./gallery/Gallery";

import firebase from "../../config/Config";
import { connect } from "react-redux";
import { getImages } from "../../redux/actions/imageActions";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_KEY
 });

const Dashboard = ({ getImages, thumbnails }) => {
  const [infoState, setInfoState] = useState({
    imageFile: "",
    genderData: "",
    ageData: "",
    raceData: "",
  });
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceData, setFaceData] = useState("");
  const [multiBox, setMultibox] = useState("");
  const [nameData, setNameData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isSignedIn = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    isSignedIn && getImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // sort data into seperate objects, either face or name data
  const sortFunc = (data, type) => {
    const arr = [];
    data.map(item => {
      return arr.push({
        id: item.id,
        boundingBox: item.region_info.bounding_box,
        ...(type === "face") ? {face: item.data.concepts } : {name: item.data.concepts[0]}
      })
    })
    if (type === "face") setFaceData(arr)
    return arr;
  };

  // get bounding box values for multiple faces 
  const multiBoundingBox = (data, size) => {
    const boundingBoxArr = [];
    data.map(item => {
      return boundingBoxArr.push(
        {id: item.id, boundingBox: calculateFaceLocations(item.boundingBox, size)}
      ) 
    })
    setMultibox(boundingBoxArr)
  };

  // get bounding box values for multiple names 
  const nameBoundingBox = (data, size) => {
    const nameArr = [];
    const nameAdjustment = 50;
    data.map(item => {
      return nameArr.push(
        {id: item.id, name: item.name, boundingBox: calculateFaceLocations(item.boundingBox, size, nameAdjustment)}
      )
    })
    setNameData(nameArr)
  };

  // calculate the x,y points for multiple bounding boxes, for either faces or names
  const calculateFaceLocations = (data, size, nameAdjustment) => {
    const clarifaiFace = data
    let width, height;
    if (!size) {
      const image = document.getElementById("inputImage");
      width = Number(image.width);
      height = Number(image.height);
    } else {
      width = Number(size.width);
      height = Number(size.height);
    }
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: nameAdjustment ? (clarifaiFace.top_row * height - nameAdjustment) : clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottowRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  // get the face data info for multiple faces
  const getMultiFaceData = (data) => {
    const ageData = data[0].face.filter(item => item.vocab_id === "age_appearance")[0].name
    const genderData = data[0].face.filter(item => item.vocab_id === "gender_appearance")[0].name
    const raceData = data[0].face.filter(item => item.vocab_id === "multicultural_appearance")[0].name
    setInfoState(prevState => ({
      ...prevState,
      genderData,
      ageData,
      raceData })
    )
  };

  const [hover, setHover] = useState(null);

  // get the id from bounding box click
  const getIdFromImage = (id) => {
    const filteredData = faceData.filter(item => item.id === id)
    getMultiFaceData(filteredData)
    setHover(true);
  };

  // execute on input change
  const onInputChange = (e) => {
    setInput(e.target.value)
  };

  // execute on form submit
  // request data from Clarifai API
  const onFormSubmit = (e) => {
    e.preventDefault()
    setErrorMessage("")
    setImageUrl(input)
    app.workflow.predict(
      "my-workflow", 
      input)
        .then(response => {
          const responseData = response.results[0].outputs
          const faceData = sortFunc(responseData[0].data.regions, "face")
          const nameData = sortFunc(responseData[1].data.regions, "name")
          multiBoundingBox(faceData)
          nameBoundingBox(nameData)
          getMultiFaceData(faceData)

          return { faceData, nameData };
         })
          .then((data) => {
            const user = isSignedIn && firebase.auth().currentUser.uid;
            const size = document.getElementById("inputImage")

            isSignedIn && firebase
              .firestore()
              .collection("images")
              .add({
                userUid: user, 
                imageUrl: input, 
                faceData: data.faceData, 
                nameData: data.nameData,
                size: {width: size.width, height: size.height},
                createdAt: new Date()
              })
              .catch(err => console.log(err))   
         })
        .catch(err => {
          console.log(err)
          setErrorMessage("No face was detected")
        });
        
    e.target.reset()
  };     

  // get data from saved images 
  const getImageData = (data) => {
    setErrorMessage("")
    setImageUrl(data.imageUrl)
    setFaceData(data.faceData)
    multiBoundingBox(data.faceData, data.size)
    nameBoundingBox(data.nameData, data.size)
    getMultiFaceData(data.faceData)
  };

  return (
    <div className="center" >
      <DetectBox onInputChange={onInputChange} onFormSubmit={onFormSubmit} />
      <Gallery thumbnails={thumbnails} getImageData={getImageData} />

      {errorMessage 
        ? 
        <div className="mb7 br3 mv3 ba b--white-50 w-70 shadow-5 center" >
          <p className="f3 mv5" >{errorMessage}</p>
        </div>
        :
        <>
        {imageUrl && 
          <div className="title-box" >
            <Confidence />
            <h4>Hover above the box to reveal the name</h4>
          </div>}
         
        <div className="flex center mw8">
          <div className="image-box w-100 mv2 tc">
            <ImageBox
              imageUrl={imageUrl} 
              multiBox={multiBox}
              nameData={nameData}
              infoState={infoState}
              getIdFromImage={getIdFromImage}/>
          </div>

            <div className="info-box w-70-ns w-auto w-auto-m ma2">
              {(imageUrl) &&
                <div>
                  {infoState.genderData ? 
                    <Breakpoint customQuery="(min-width: 800px)" >
                      <InfoBox infoState={infoState} hover={hover} />
                    </Breakpoint>
                    : <div className="lds-dual-ring">
                      </div>}
                </div>}
            </div>
        </div>
        </>
      }

    </div>
    )
};

// access thumbnails from redux state
const mapStateToProps = (state) => {
  const isSignedInLocal = JSON.parse(localStorage.getItem("authUser"))
  const isSignedIn = state.auth.isUserSignedIn
  const thumbnails = state.image.thumbnails
  const removeDuplicates = thumbnails && thumbnails.filter(
    (elem,index,self)=>self.findIndex(t=>(t.imageUrl === elem.imageUrl))===index
  )
  const filteredThumbnails = removeDuplicates && removeDuplicates.filter(item => {
    return item.data.userUid === (isSignedIn || isSignedInLocal.uid)
  })
  
  return {
    thumbnails: filteredThumbnails
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getImages: () => dispatch(getImages())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);