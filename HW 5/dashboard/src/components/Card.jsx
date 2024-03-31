import React from "react";
import { useState, useEffect } from 'react';

const Card = (prod) => {
    return ( 
        <div>
            <h2 className="title">{prod.title}</h2>
            <p>{prod.statistic}</p>
        </div>
    )
}

export default Card