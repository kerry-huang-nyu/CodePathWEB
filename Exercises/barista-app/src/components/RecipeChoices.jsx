import React, { Component, useEffect, useState } from "react";

const RecipeChoices = ({handleChange, label, choices, checked}) => {
    return (
      <div className="radio-buttons">
        {choices &&
          choices.map((choice) => (
            <li key={choice}>
              <input
                id={choice}
                value={choice}
                name={label}
                type="radio"
                onChange={handleChange}
                checked={checked == choice}
              />
                {choice}
            </li>
          ))}
      </div>
    );
};

export default RecipeChoices;

//used to make different inputs via radio buttons 
//pass different answer choices as props 
//.map() matches each choice with a radio button 
