import React from "react";

const Confidence = () => {
  return (
    <div className="cf w-80 pa2 pt0 center">
      <h2 className="mt0">Name confidence scale</h2>
      <div className="f7 f6-m f5-ns w-20 fl tc pv2 bg-red br3 black">
        0 - 20%
      </div>
      <div className="f7 f6-m f5-ns w-20 fl tc pv2 bg-orange br3 black">
        20 - 40%
      </div>
      <div className="f7 f6-m f5-ns w-20 fl tc pv2 bg-yellow br3 black">
        40 - 60%
      </div>
      <div className="f7 f6-m f5-ns w-20 fl tc pv2 bg-blue br3 black">
        60 - 80%
      </div>
      <div className="f7 f6-m f5-ns w-20 fl tc pv2 bg-green br3 black">
        80 - 100%
      </div>
    </div>
  );
};

export default Confidence;
