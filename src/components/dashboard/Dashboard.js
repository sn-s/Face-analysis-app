import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Clarifai from "clarifai";
import DetectBox from "./detectBox/DetectBox";
import InfoBox from "./infoBox/InfoBox";
import ImageBox from "./imageBox/ImageBox";
import Gallery from "./gallery/Gallery";

import firebase from "../../config/Config";

import { connect } from "react-redux";
import { getImages } from "../../redux/actions/imageActions";

const app = new Clarifai.App({
  apiKey: "b92149452bda4fc6aa6c01703e637e2f"
 });

const Dashboard = ({ getImages, thumbnails }) => {
  const [state, setState] = useState({
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

  // sort face data into separate objects
  const sortData = (data) => {
    const faceArr = [];
    data.map(item => {
      return faceArr.push({
        id: item.id,
        boundingBox: item.region_info.bounding_box,
        face: item.data.face,
      })
    }) 
    setFaceData(faceArr)
    return faceArr;
  };

  // sort name data into separate objects
  const sortNameData = (data) => {
    const nameArr = []
    data.map(item => (
      nameArr.push({
        id: item.id,
        boundingBox: item.region_info.bounding_box,
        name: item.data.concepts[0]
      })
    ))
    return nameArr;
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

  // calculate the x,y points for multiple bounding boxes
  const calculateFaceLocations = (data, size, nameAdjustment) => {
    const clarifaiFace = data
    let width, height;
    if(!size) {
      const image = document.getElementById("inputImage");
      width = Number(image.width);
      height = Number(image.height);
    }
    if(size) {
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

  // get the face data values for multiple faces
  const getMultiFaceData = (data) => {
    const genderData = data[0].face.gender_appearance.concepts[0].name
    const ageData = data[0].face.age_appearance.concepts[0].name
    const raceData = data[0].face.multicultural_appearance.concepts[0].name
    const celebrity = data[0].name
    setState(prevState => ({
      ...prevState,
      genderData,
      ageData,
      raceData,
      celebrity})
    )
  };

  // get the id from bounding box click
  const getIdFromImage = (id) => {
    const filteredData = faceData.filter(item => item.id === id)
    getMultiFaceData(filteredData)
  };

  // execute on input change
  const onInputChange = (e) => {
    setInput(e.target.value)
  };

  // execute on form submit
  const onFormSubmit = (e) => {
    e.preventDefault()
    setErrorMessage("")
    setImageUrl(input)
    app.workflow.predict(
      "my-workflow", 
      input)
        .then(response => {
          const responseData = response.results[0].outputs
          const faceData = sortData(responseData[0].data.regions)
          const nameData = sortNameData(responseData[1].data.regions)
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

  // execute on file submit
  const onFileSubmit = (e) => {   
    setErrorMessage("")
    let img = e.target.files[0]
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      setState(prevState => ({
        ...prevState,
        imageFile: reader.result
      }))
      let imageData = reader.result.split(',')[1];
      clarifaiFunc(imageData)
    }, false);

    if (img) {
      reader.readAsDataURL(img);
    }

    const clarifaiFunc = (image) => {
      app.workflow.predict(
        "my-workflow", 
        {base64: image})
        .then(response => {
          const responseData = response.results[0].outputs
          const faceData = sortData(responseData[0].data.regions)
          const nameData = sortNameData(responseData[1].data.regions)
          multiBoundingBox(faceData)
          nameBoundingBox(nameData)
          getMultiFaceData(faceData)
        })
        .catch(err => {
          console.log(err)
        })
    }
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

  const { imageFile, genderData, ageData, raceData } = state;

  return (
    <div className="center" >
      <DetectBox 
        onInputChange={onInputChange} 
        onFormSubmit={onFormSubmit} 
        onFileSubmit={onFileSubmit} />

      <Gallery thumbnails={thumbnails} getImageData={getImageData} />

      {errorMessage 
        ? 
        <div className="mb7 br3 mv3 ba b--white-50 w-70 shadow-5 center" >
          <p className="f3 mv5" >{errorMessage}</p>
        </div>
        :
        <div className="mw8 center ph0-ns" >
          <div className="fl w-50 pr4 pv5 " >
              <ImageBox 
                imageUrl={imageUrl} 
                imageFile={imageFile}
                multiBox={multiBox}
                nameData={nameData}
                getIdFromImage={getIdFromImage} />
             
          </div>
          {(imageUrl || imageFile) && 
          <div className="fl w-50 pl4 pv5" >
            {genderData ? <InfoBox 
              genderData={genderData} 
              ageData={ageData} 
              raceData={raceData} /> 
              : <div className="lds-dual-ring"></div>}
          </div>}
        </div>}

    </div>
    )
};

const mapStateToProps = (state) => {
  const isSignedInLocal = JSON.parse(localStorage.getItem("authUser"))
  const isSignedIn = state.auth.isUserSignedIn
  const thumbnails = state.image.thumbnails
  const removeDuplicates = thumbnails && thumbnails.filter(
    (elem,index,self)=>self.findIndex(t=>(t.imageUrl === elem.imageUrl))===index
  )
  const filteredThumbnails = removeDuplicates && removeDuplicates.filter(item => item.data.userUid === (isSignedIn || isSignedInLocal.uid))
  
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