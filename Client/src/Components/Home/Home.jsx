import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Chart, registerables } from 'chart.js';
import Cookies from 'js-cookie';
import style from './Home.module.css'

Chart.register(...registerables);

export default function Home() {
  const [chartData, setChartData] = useState(null);
  
  async function fetchAndDisplayChart() {
    try {
      const response = await fetch('http://localhost:3000/example', {
        headers: {
          'Authorization': Cookies.get('token')
        },
      });
      const data = await response.json();
      console.log("**********************************************************");
      console.log("Response:", response);
      console.log("Data:", data);

      if (!data || data.length === 0) {
        console.error('No data received');
        return;
      }

      const labels = data.map(result => result.date); // Mapping 'date' to labels
      const values = data.map(result => result.results); // Mapping 'results' to values

      console.log("Labels:", labels);
      console.log("Values:", values);

      const ctx = document.getElementById('executionResultsChart').getContext('2d');
      new Chart(ctx, {
        type: 'line', // Line chart type
        data: {
          labels: labels,
          datasets: [{
            label: 'Execution Results',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,
            pointRadius: 2,
            tension: 0.1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Results'
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
        }
      });

    } catch (error) {
      console.error('Error fetching or displaying chart:', error);
    }
  }

  return (
    <>
        <header className={style.head1}>
        <div className={style.logoContainer}>
          <img src="../Images/logo.png" alt="Logo" className={style.logo} />
        </div>
        <nav className={style.navbar}>
          <NavLink to="debts" className={style.nav}>Learn about Debts</NavLink>
          <NavLink to="risks" className={style.nav}>Risks</NavLink>
          <NavLink to="about" className={style.nav}>About</NavLink>
          <NavLink to="news" className={style.nav}>News</NavLink>
          <NavLink to="contact" className={style.nav}>Contact us</NavLink>
        </nav>
      </header>


      <button onClick={fetchAndDisplayChart} className={style.ShowGraph}>Show Graph</button>

      <h1>Home</h1>



      <div className="App">
        <h1>Stock Data Analysis</h1>
        <canvas id="executionResultsChart" width="400" height="200"></canvas>
      </div>

      <Outlet />
    </>
  );
}
