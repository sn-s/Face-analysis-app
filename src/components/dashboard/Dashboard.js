import React, { useState } from "react";
import Clarifai from "clarifai";

import DetectBox from "../detectBox/DetectBox";
import Confidence from "../imageBox/confindence";
import ImageBox from "../imageBox/ImageBox";
import InfoBox from "../infoBox/InfoBox";

// const app = new Clarifai.App({
//   apiKey: process.env.REACT_APP_KEY, ///// Hide env file in github
// });

const app = new Clarifai.App({
  apiKey: "ea2eb8044b704154b2c20b0a10226faa", ///// HIDE .ENV IN GITHUB /////
});

const Dashboard = ({ getImages, thumbnails }) => {
  const [infoState, setInfoState] = useState({
    nameData: "",
    genderData: "",
    ageData: "",
    raceData: "",
  });
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceData, setFaceData] = useState([]);
  const [nameData, setNameData] = useState([]);
  const [multiBox, setMultibox] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // sort data into seperate objects, either face or name data
  const sortFunc = (data, type) => {
    const arr = [];
    data[0].data.regions.forEach((item, index) => {
      return arr.push({
        id: data[0].data.regions[index].id,
        boundingBox: data[0].data.regions[index].region_info.bounding_box,
        ...(type === "face"
          ? {
              face: {
                race: data[2].data.regions[index].data.concepts[0].name,
                gender: data[3].data.regions[index].data.concepts[0].name,
                age: data[4].data.regions[index].data.concepts[0].name,
              },
            }
          : {
              name: data[5].data.regions[index].data.concepts[0].name,
              value: data[5].data.regions[index].data.concepts[0].value,
            }),
      });
    });
    if (type === "face") setFaceData(arr);
    return arr;
  };

  // get bounding box values for multiple faces
  const multiBoundingBox = (data, size) => {
    const boundingBoxArr = [];
    data.map((item) => {
      return boundingBoxArr.push({
        id: item.id,
        boundingBox: calculateFaceLocations(item.boundingBox, size),
      });
    });
    setMultibox(boundingBoxArr);
  };

  // get bounding box values for multiple names
  const nameBoundingBox = (data, size) => {
    const nameArr = [];
    const nameAdjustment = 50;
    data.map((item) => {
      return nameArr.push({
        id: item.id,
        name: item.name,
        value: item.value,
        boundingBox: calculateFaceLocations(
          item.boundingBox,
          size,
          nameAdjustment
        ),
      });
    });
    setNameData(nameArr);
  };

  // calculate the x,y points for multiple bounding boxes, for either faces or names
  const calculateFaceLocations = (data, size, nameAdjustment) => {
    const clarifaiFace = data;
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
      topRow: nameAdjustment
        ? clarifaiFace.top_row * height - nameAdjustment
        : clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottowRow: height - clarifaiFace.bottom_row * height,
    };
  };

  // get the face data info for multiple faces
  const getMultiFaceData = (data, name) => {
    const nameData = name ? name[0].name : "";
    const ageData = data[0].face.age;
    const genderData = data[0].face.gender;
    const raceData = data[0].face.race;
    setInfoState((prevState) => ({
      ...prevState,
      nameData,
      genderData,
      ageData,
      raceData,
    }));
  };

  const [hover, setHover] = useState(null);

  // get the id from bounding box click
  const getIdFromImage = (id) => {
    const filteredData = faceData.filter((item) => item.id === id);
    const filteredName = nameData.filter((item) => item.id === id);
    getMultiFaceData(filteredData, filteredName);
    setHover(true);
  };

  // execute on input change
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  // execute on form submit
  // request data from Clarifai API
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setInfoState({
      nameData: "",
      genderData: "",
      ageData: "",
      raceData: "",
    });
    setFaceData([]);
    setNameData([]);
    setMultibox([]);
    setErrorMessage("");
    setImageUrl(input);

    try {
      const response = await app.workflow.predict("Face-Detector", input);
      const responseData = response.results[0].outputs;

      const faceData = sortFunc(responseData, "face");
      const nameData = sortFunc(responseData, "name");
      multiBoundingBox(faceData);
      nameBoundingBox(nameData);
      getMultiFaceData(faceData, nameData);

      setInput("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Unable to detect any faces");
      setInput("");
    }
  };

  let imageHeight = document.getElementById("inputImage")?.height + 50;

  return (
    <div className="center">
      <DetectBox
        input={input}
        onInputChange={onInputChange}
        onFormSubmit={onFormSubmit}
      />

      {errorMessage ? (
        <div className="mb7 br3 mv3 ba b--white-50 w-70 shadow-5 center">
          <p className="f3 mv5">{errorMessage}</p>
        </div>
      ) : (
        <>
          {imageUrl && (
            <div className="title-box">
              <Confidence />
            </div>
          )}

          <div
            style={{ height: imageHeight ? imageHeight : "" }}
            className="center mw7 tc"
          >
            <div className="image-box">
              <ImageBox
                imageUrl={imageUrl}
                multiBox={multiBox}
                nameData={nameData}
                getIdFromImage={getIdFromImage}
              />
            </div>
          </div>

          <div
            style={{ position: "relative", width: "80%", margin: "auto" }}
            className="info-box"
          >
            {imageUrl && (
              <div>
                {infoState.genderData ? (
                  <div>
                    <h2 className="ma1">Face Analysis Data</h2>
                    <InfoBox infoState={infoState} hover={hover} />
                    <p className="mt4">
                      Icons made by Freepik from www.flaticon.com; Marvdrock and
                      Ted Grajeda from www.thenounproject.com
                    </p>
                  </div>
                ) : (
                  <div className="lds-dual-ring"></div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
