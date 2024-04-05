import { useState, useEffect } from 'react'
import Card from './components/Card'
import List from './components/List'
import './App.css'
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const API_KEY = "b3e372e531e14aba8fe74bfe379e7256"

function App() {

  //i want to have a list of checkboxes that then get connected to a search engine to then filter stuff 

  const [sliderValue, setSliderValue] = useState(5);

  const [diet, setDiet] = useState('omnivore');

  const [data, setData] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [plot, setPlot] = useState([]);

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

      let temp = json.results.map((item, index) => ({
        x: item.healthScore, // Assuming xField is the property representing the x-coordinate in each JSON object
        y: item.weightWatcherSmartPoints, // Assuming yField is the property representing the y-coordinate in each JSON object
        // You can add more properties here if needed
      }));

      console.log("this is my temp", temp)

      setPlot(temp)
      
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
      <div key={index}>
        <List name={recipe.title}
        image={recipe.image}
        serving_price={recipe.pricePerServing}
        healthy = {recipe.healthScore}
        sustainable = {recipe.sustainable}/>
        
        <Link style={{ color: "white" }} to={`/moreinfo/${recipe.id}`}>More Info</Link>
        </div>
      ))}


    <LineChart width={800} height={400} data={plot}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x">
        <Label value="Health Score" position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Weight Watcher Smart Pts" angle={-90} position="insideLeft" />
      </YAxis>
      
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>

      
      
    </>
  )
}

export default App
