import React from "react";
import "./Comp.css";



const Comp = ({ images }) => {
  return (
    <div className="photos">
      {images.map((image, index) => {
        return (
          <div key={image + index} className="photo">
            <img className="image" src={image} alt={"img"} />
            
          </div>
        );
      })}
    </div>
  );
};

export default Comp;
