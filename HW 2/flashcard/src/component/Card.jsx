import React from "react";
import { useState, useEffect } from 'react';

const Card = (prod) => {

    let colorimpossible = "#FAADCC";
    let colorhard = "#CCE8F8";
    let colormedium = "#FDD836";
    let coloreasy = "#D6DE16";
    let colordefault = coloreasy;

    // Define local state for managing front/back state of the card
    const [front, setFront] = useState(true);
    const [content, setContent] = useState(prod.question);
    const [color, setColor] = useState(colordefault);
    const [diff, setDiff] = useState(1);

    const setcolor = (temp) => {
        var tempcolor = colordefault;
        if (temp > 0.5){
            console.log("hello");
            tempcolor = coloreasy;
        }
        else if (temp > 0.25){
            console.log("no");
            tempcolor = colormedium;
        }
        else if (temp > 0.05){
            tempcolor = colorhard;
        }
        else {
            tempcolor = colorimpossible;
        }
        setColor(tempcolor);
    }

    

    useEffect(() => {
        setContent(prod.question)
        setFront(true)
        setcolor(prod.diff)
        setDiff(prod.diff)
    }, [prod.question, prod.answer, prod.diff]);
 

    // Define function to handle flipping the card
    const flip = () => {
        setFront(!front); // Toggle the front/back state
        if (front === true){
            setContent(prod.answer);
        }
        else{
            setContent(prod.question);
        }
    };
    
    return ( 
        <div className = "card" style={{ backgroundColor: color}} onClick={flip}>
            <h2>{content}</h2>
            {!front && <h5>{diff * 100 + "% of people answer correctly"}</h5>}
        </div>
    )
}

export default Card