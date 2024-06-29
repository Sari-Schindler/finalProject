import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Line } from 'react-chartjs-2';
// import { fetchStockData } from '../fetchStockData.js';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

export default function Home() {

  const [chartData, setChartData] = useState(null);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetchStockData('AAPL', '2022-01-01', '2023-01-01');
  //     setChartData(data);
  //   };

  //   getData();
  // }, []);
  
  const [haveQuestion, setHaveQuestion] = useState(false);

  function handleQuestion() {
    setHaveQuestion(true);
  }

  function leaveMessage(event) {
    event.preventDefault();
    setHaveQuestion(false);
  }

  return (
    <>
      <nav>
        <NavLink to="debts">Learn about Debts</NavLink><br />
        <NavLink to="risks">Risks</NavLink><br />
        <NavLink to="about">About</NavLink><br />
      </nav>
      <h1>Home</h1>
      <button onClick={handleQuestion}>Leave Details</button>

      {haveQuestion && (
        <form onSubmit={leaveMessage}>
          <p>Leave your details and we will get back to you soon</p>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required />
          </div><br />
          <div>
            <label htmlFor="phone">Phone:</label>
            <input type="tel" id="phone" required />
          </div><br />
          <button type="submit">Send</button>
        </form>
      )}

      <div className="App">
        <h1>Stock Data Analysis</h1>
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      <Outlet />
    </>
  );
}
