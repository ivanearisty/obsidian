import './App.css';
import React from 'react';
import Chart from './components/Graph';
import { useState } from "react";
import * as d3 from "d3";


function App() {
  
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
      <div className="App" onMouseMove={onMouseMove}>
        <h1 className="text-center">Interactive Visualization</h1>
        <Chart data={data}/>
        
      </div>
  );
}

export default App;
