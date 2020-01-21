import React from 'react';

const Confidence = () => {
  return ( 
    <div className="cf w-80 pa2 pt0 center">
      <h3 className="mt0" >Name confidence scale</h3>
      <div className="fl w-20 tc pv3 bg-red br3 black">
        0 - 20%
      </div>
      <div className="fl w-20 tc pv3 bg-orange br3 black">
        20 - 40%
      </div>
      <div className="fl w-20 tc pv3 bg-yellow br3 black">
        40 - 60%
      </div>
      <div className="fl w-20 tc pv3 bg-blue br3 black">
        60 - 80%
      </div>
      <div className="fl w-20 tc pv3 bg-green br3 black">
        80 - 100%
      </div>
    </div>
   );
}
 
export default Confidence;