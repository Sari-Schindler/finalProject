import React, { useState, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Chart, registerables } from 'chart.js';
import Cookies from 'js-cookie';
import style from './Home.module.css';
import { userContext } from "../../App"; // Assuming userContext is defined in App.jsx or a separate file

Chart.register(...registerables);

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);
  const [chartData, setChartData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  async function fetchAndDisplayChart(endpoint) {
    try {
      const response = await fetch(`http://localhost:3000/${endpoint}`, {
        headers: {
          'Authorization': Cookies.get('token')
        },
      });
      const data = await response.json();
  
      if (!data || data.length === 0) {
        console.error('No data received');
        return;
      }
  
      console.log('Fetched data:', data);
  
      const validData = data.filter(item => item && item.date && item.results);
  
      const invalidData = data.filter(item => !item || !item.date || !item.results);
      if (invalidData.length > 0) {
        console.warn('Invalid data items:', invalidData);
      }
  
      const labels = validData.map(result => result.date);
      const values = validData.map(result => result.results);
  
      const ctx = document.getElementById('executionResultsChart').getContext('2d');
      if (chartData) {
        chartData.destroy(); // Destroy existing chart instance if it exists
      }
      const newChart = new Chart(ctx, {
        type: 'line',
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
  
      setChartData(newChart); // Store the chart instance in state
    } catch (error) {
      console.error('Error fetching or displaying chart:', error);
    }
  }
  
  async function handleInputSubmit() {
    try {
      const response = await fetch('http://localhost:3000/strategy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Cookies.get('token')
        },
        body: JSON.stringify({ userInput: inputValue }) // Ensure the key matches the one expected on the server-side
      });
      const result = await response.json();
      console.log('Server response:', result);
      
      // Display the strategy response as a chart
      fetchAndDisplayChart('strategy'); // Fetch and display chart using strategy endpoint
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }
  

  function clearAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  }

  function handleLogout() {
    localStorage.clear();
    clearAllCookies();
    navigate('/login', { replace: true });
    window.location.reload();
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
          <NavLink to="displayusers" className={style.nav}>display users</NavLink>
          <a href="#" className={style.nav} onClick={handleLogout}>Log out</a>
        </nav>
      </header>

      <button onClick={() => fetchAndDisplayChart('example')} className={style.ShowGraph}>Show Example Graph</button>

      <h1>Home</h1>

      <div className="App">
        <h1>Stock Data Analysis</h1>
        <canvas id="executionResultsChart" width="400" height="200"></canvas>
      </div>

      <div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter text here"
        />
        <button onClick={handleInputSubmit}>Submit</button>
      </div>

      <Outlet />
    </>
  );
};

export default Home;
