import React, { useState, useContext, useEffect } from "react";
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
  const navigate = useNavigate();


  async function fetchAndDisplayChart() {
    try {
      const response = await fetch('http://localhost:3000/example', {
        headers: {
          'Authorization': Cookies.get('token')
        },
      });
      const data = await response.json();
  
      if (!data || data.length === 0) {
        console.error('No data received');
        return;
      }
  
      // Log the entire data array to inspect its structure
      console.log('Fetched data:', data);
  
      // Filter out any items that are null or don't have the expected properties
      const validData = data.filter(item => item && item.date && item.results);
  
      // Log any items that were filtered out
      const invalidData = data.filter(item => !item || !item.date || !item.results);
      if (invalidData.length > 0) {
        console.warn('Invalid data items:', invalidData);
      }
  
      // Map the filtered data to get labels and values
      const labels = validData.map(result => result.date);
      const values = validData.map(result => result.results);
  
      const ctx = document.getElementById('executionResultsChart').getContext('2d');
      new Chart(ctx, {
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
  
    } catch (error) {
      console.error('Error fetching or displaying chart:', error);
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
    // Clear local storage
    localStorage.clear();

    // Clear all cookies
    clearAllCookies();

    // Navigate to the login page and replace history
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
          {/* {isManager && <NavLink to="displayusers" className={style.nav}>display users</NavLink>} */}
          <NavLink to="displayusers" className={style.nav}>display users</NavLink>
          <a href="#" className={style.nav} onClick={handleLogout}>Log out</a>
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
};

export default Home;
