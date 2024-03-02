import './App.css';
import Calendar from './components/Calendar'

const App = () => {

  return (
    <div className="App">

        <h1>Itinerary for 5 Days in the UAE</h1>
        <h2>Welcome to UAE! You are expected to plan 2 trips in Abu Dhabi while the aunties plan 3 days in Dubai :3</h2>

        <Calendar />
    </div> 
  )
}

export default App