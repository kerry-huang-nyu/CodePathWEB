import { useState, useEffect } from 'react'
import Card from './components/Card'
import List from './components/List'
import './App.css'

const API_KEY = '43e3048e06424569b9c4cad228c0d8d0'//import.meta.env.API_KEY;

function App() {

  //i want to have a list of checkboxes that then get connected to a search engine to then filter stuff 

  const [sliderValue, setSliderValue] = useState(5);

  const [diet, setDiet] = useState('omnivore');

  const [data, setData] = useState([]);

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    queryAPI();
  }, []); 

  // Function to handle radio button change
  const handleOptionChange = (event) => {
    setDiet(event.target.value);
  };


  // Function to handle slider change
  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value)); // Parse the value to an integer
  };

  const queryAPI = async () =>{
    
    try {
      let query = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&diet=${diet}&number=${sliderValue}&addRecipeNutrition=${true}`;
    
      const response = await fetch(query);
      const json = await response.json();

      console.log(json.results);
      setData(json.results);
      setFiltered(json.results);
    }
    catch{
        console.error(error);
        alert("Oops! Something went wrong while fetching data, please try again later.");
    }

  }

  const filterResults = () =>{
    var searchValue = document.getElementById("search").value;
    document.getElementById("search").value = "";

    if (searchValue !== "") {
      const filteredData = Object.keys(data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredData);
      console.log(filteredData);
    } else {
      setFiltered(Object.keys(data));
    }

    console.log("this is my filtered: ", filtered);

  }


  return (
    <>
      <h1>Step 1: Search</h1>
      <input
        type="range"
        min={5}
        max={15}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <p>Number of Recipes: {sliderValue}</p>

      {/* Radio button for option 1 */}
      <input
        type="radio"
        id="omnivore"
        name="diet"
        value="omnivore"
        checked={diet === 'omnivore'}
        onChange={handleOptionChange}
      />
      <label htmlFor="omnivore">Omnivore</label>

      {/* Radio button for option 2 */}
      <input
        type="radio"
        id="vegan"
        name="diet"
        value="vegan"
        checked={diet === 'vegan'}
        onChange={handleOptionChange}
      />
      <label htmlFor="vegan">Vegan</label>

      {/* Radio button for option 3 */}
      <input
        type="radio"
        id="paleo"
        name="diet"
        value="paleo"
        checked={diet === 'paleo'}
        onChange={handleOptionChange}
      />
      <label htmlFor="paleo">Paleo</label>

      <br></br>
      <button onClick={queryAPI}>Query Database</button>

      <br></br>

      <h1>Step 2: find a recipe</h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" name="search"></input>
      <button onClick={filterResults}>Enter</button>
      <br></br>



      <h1>Statistics on the queries</h1>
      <div className="card_banner">
        <Card title="Average Price" statistic={filtered.reduce((sum, obj) => sum + obj.pricePerServing, 0) / filtered.length}/> 
        <Card title="Min Price" statistic={Math.max(...filtered.map(obj => obj.pricePerServing))}/>
        <Card title="Max Price" statistic={Math.min(...filtered.map(obj => obj.pricePerServing))}/> 
      </div>

      
      {/* Display the current value of the slider */}

      {filtered.map((recipe, index) => (
      <List key = {index}
        name={recipe.title}
        image={recipe.image}
        serving_price={recipe.pricePerServing}
        healthy = {recipe.healthScore}
        sustainable = {recipe.sustainable}
      />
      ))}
      
    </>
  )
}

export default App
