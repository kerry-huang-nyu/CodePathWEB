import React from "react";
import { useState, useEffect } from 'react';

const List = ({name, image, serving_price, healthy, sustainable}) => {

    return ( 
        <div>
            <p>{name}</p>
            <img src={image}></img>
            <p>{serving_price}</p>
            <p>{healthy}</p>
            <p>{sustainable}</p>
            
        </div>
    )
}

export default List