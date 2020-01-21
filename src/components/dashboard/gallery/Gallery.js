import React from "react";
import "./Gallery.css";

const Gallery = ({ thumbnails, getImageData }) => {

  return ( 
    <div className="cf bg-grey ma4" >
      {thumbnails && thumbnails.length > 0 && <p className="f3 mt1 mb4">URL search history</p>}
      {thumbnails && thumbnails.map(item => (
        <img 
          className="thumbnail-box w-20-ns tc pv5 bg-black-50"
          key={item.id}
          alt="face" 
          src={item.data.imageUrl} 
          style={{width: "80px", height: "auto", padding: "10px"}}
          onClick={() => getImageData(item.data)} />
      ))}
    </div>
   );
}
 
export default Gallery;