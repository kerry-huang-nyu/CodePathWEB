import React from "react";

const Banner = (prod) => {

  return (
    <div className = 'eventCard'>

      <img className = 'croppedImage' src={prod.src}/>
      <h2>{prod.message}</h2>
      <p>Arrive at {prod.date}</p>
    </div>
  )
}

export default Banner;