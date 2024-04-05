import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const API_KEY = 'b3e372e531e14aba8fe74bfe379e7256'//import.meta.env.API_KEY;


const MoreInfo = (prod) => {
    let params = useParams();

    const [details, setDetails] = useState({"title": "Invalid", "summary": "Nothing to see here"});

    useEffect(() => {
        const getCoinDetail = async () => {
            
            let query = `https://api.spoonacular.com/recipes/${params.symbol}/summary?apiKey=${API_KEY}`;
            const info = await fetch(query);
            const infoJson = await info.json();
      
          setDetails(infoJson);
          console.log(infoJson)
        };
        
        getCoinDetail().catch(console.error);
        
      }, [params.symbol]);


    return ( 
        <div>
            <h1>{details.title}</h1>
            {details.summary}
        </div>
    )
}

export default MoreInfo