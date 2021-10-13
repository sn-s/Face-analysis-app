import React from "react";

const DetectBox = ({ input, onInputChange, onFormSubmit }) => {
  return (
    <div>
      <p className="f4 f3-ns center w-80 mv5">
        WHO-AM-I is powered by Clarifai, which uses a Visual Recognition AI to
        analyse images and return data based on facial characteristics. Clarifai
        uses machine learning to train models to recognise certain patterns in
        the images.
      </p>
      <div className="br3 mv3 ba b--white-50 w-70 shadow-5 center">
        <form className="form center pa3 br3 shadow-5" onSubmit={onFormSubmit}>
          <input
            className="f5 f4-ns pa2 w-100 w-75-m w-50-ns center"
            type="text"
            placeholder="Add a URL and click detect"
            value={input}
            onChange={onInputChange}
          />
          <button className="w50 ma3 w-30-ns f5 f4-ns grow link ph3 pv2 dib white bg-orange">
            Detect
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetectBox;
