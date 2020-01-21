import React from "react";
import "./DetectBox.css";

const DetectBox = ({ onInputChange, onFormSubmit, onFileSubmit }) => {
  return (
    <div>
      <p className="f3 mv5">
        WHO-AM-I is powered by Clarifai, which uses a Visual Recognition AI to analyse images 
        and return data based on facial characteristics. Clarifai uses machine learning to train 
        models to recognise certain patterns in the images.
      </p>
      <p className="f3">
        Click <span ><a className="sub-title yellow"  href="/signup" >here</a></span> to create an account and save your searches.
      </p>
      <div className="br3 mv3 ba b--white-50 w-70 shadow-5 center"> 
        <form className="form center pa4 br3 shadow-5" onSubmit={onFormSubmit} > 
          <input 
            className="f4 pa2 w-50 center" 
            type="text" 
            placeholder="Add a URL and click detect"
            onChange={onInputChange} />
          <button 
            className="w-30 grow f4 link ph3 pv2 dib white bg-orange"
          >Detect</button>
          <div className="pt4 center" >
            <label className="w-30 grow f4 ph3 pv2 dib white bg-black-30" htmlFor="file">Browse file</label>
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
