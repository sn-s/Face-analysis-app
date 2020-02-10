import React from "react";
import "./DetectBox.css";

const DetectBox = ({ onInputChange, onFormSubmit, onFileSubmit }) => {
  return (
    <div>
      <p className="f4 f3-ns mv5">
        WHO-AM-I is powered by Clarifai, which uses a Visual Recognition AI to analyse images 
        and return data based on facial characteristics. Clarifai uses machine learning to train 
        models to recognise certain patterns in the images.
      </p>
      <p className="sub-text f4 f3-ns">
        Click <span ><a className="sub-title yellow"  href="/signup" >here</a></span> to create an account and save your searches.
      </p>
      <div className="br3 mv3 ba b--white-50 w-70 shadow-5 center"> 
        <form className="form center pa3 br3 shadow-5" onSubmit={onFormSubmit} > 
          <input 
            className="f5 f4-ns pa2 w-100 w-75-m w-50-ns center" 
            type="text" 
            placeholder="Add a URL and click detect"
            onChange={onInputChange} />
          <button 
            className="w50 w-30-ns f5 f4-ns grow link ph3 pv2 dib white bg-orange"
          >Detect</button>
          <div className="pt4 center" >
            <label className="w50 w-30-ns f5 f4-ns grow ph3 pv2 dib white bg-black-30" htmlFor="file">Browse file</label>
            <input 
              style={{display: "none"}}  
              id="file" 
              type="file" 
              accept="image/png, image/jpeg"  
              onChange={onFileSubmit} />
          </div>
        </form> 
      </div>
    </div>
  )
}

export default DetectBox;
