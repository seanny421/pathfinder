import './App.css';
import { useState } from 'react';
import { BrowserRouter} from 'react-router-dom';
import Grid from "./components/grid/Grid.jsx";

function App() {
    const [algorithmSelected, setAlgorithm] = useState("Dijkstras");


  return (
    <div className="App">
        <BrowserRouter>
            <Grid/>
        </BrowserRouter>
    </div>
  );
}

export default App;
