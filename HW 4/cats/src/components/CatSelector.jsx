import React from "react";
import { useState, useEffect } from 'react';
import catImage from '../assets/cat_question.jpeg';
import catobject from './catobjects.json';

const CatSelector = (prod) => {



    const APIKEY = "live_aokvYKrow4GmdQ9bayOrJE2Wwx4vfZ7UnhILTdaxbLdSJj0Uats5ZZKt4XorI7fP";

    const defaultimage = 
    {
        "name": "???",
        "id" : null,
        "breed": "???",
        "origin": "internet",
        "vocalisation": "mew",
        "social_needs": "bite",
        "url":catImage,
    };

    //const attributes = ["adaptability", "country_code", "vocalisation", "social_needs"];

    const [catimage, setCatImage] = useState(defaultimage);

    const getpossible = () => {
        var lst = [];
        for (let key in catobject){
            lst.push(catobject[key].id);
        }
        return lst;
    }

    const [possible, setPossible]= useState(getpossible());

    const [banned, setBanned] = useState([]);

    const renderBannedList = () =>{
        return banned.map((word, index) => (
            <button className="label">{word}</button>
          ));
    }


    const blacklist = (props) => {
        if (props != null && !banned.includes(props)){
            setBanned(prevBanned => [... prevBanned, props]);
        }
    }

    const makeQuery = () => {
        var searchfor = [];
        for (let val in banned){
            if (possible.includes(banned[val])){
                searchfor = possible.filter(item => item !== banned[val]);
                setPossible(searchfor);
            }
        }
        const stringarr = searchfor.join(',');
        console.log(stringarr);

        let query = `https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${APIKEY}&breed_ids=${stringarr}`;
        return query;
    }

    const callAPI = async (query) => {
        try {
            const response = await fetch(query);
            const json = await response.json();

            if (json[0].url == null) {
                alert("Oops! Something went wrong with that query, let's try again!")
                setCatImage(defaultimage);
            }

            else {
                setCatImage(
                    {
                    "name": json[0].breeds[0].name,
                    "id" : json[0].breeds[0].id,
                    "breed": json[0].breeds[0].name,
                    "origin": json[0].breeds[0].origin,
                    "vocalisation": json[0].breeds[0].vocalisation,
                    "social_needs": json[0].breeds[0].social_needs,
                    "url": json[0].url,
                }
                );
            }
        }
        catch{
            console.error(error);
            alert("Oops! Something went wrong while fetching data, please try again later.");
        }
    }

    const getCat = () => {
        callAPI(makeQuery()).catch(console.error);


    };

    return ( 
        <div className="container">
            <div className='side_panel'>
            
            </div>

            <div className='center_panel'> 
                <h1>:3</h1>

                <div className = "selector" >
                    <h2>{"Hi my name is: " + catimage.name}</h2>

                    <button onClick={getCat}>Choose a 🐱</button>
            
                    <button className="banned" onClick={() => blacklist(catimage.id)}>{"Breed: " + catimage.breed}</button>
                    <button className="banned" >{"Origin: " + catimage.origin}</button>
                    <button className="banned" >{"Vocalize: " + catimage.vocalisation}</button>
                    <button className="banned" >{"Social: " + catimage.social_needs}</button>

                    <img className = "rounded-img" src={catimage.url} alt="failed to render"/>
        
                    </div>

                </div>

            <div className='side_panel'>
                <button className="sidebartitle">Ban List</button>
                {banned.length > 0 ? renderBannedList() : <button className="label">No Bans</button>}
            </div>
        </div>

    )
}

export default CatSelector;