import React, { useState } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { Chart, registerables } from 'chart.js';
import Cookies from 'js-cookie';

Chart.register(...registerables);

export default function Home() {
  const [chartData, setChartData] = useState(null);
  const [haveQuestion, setHaveQuestion] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  function handleQuestion() {
    setHaveQuestion(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/submitForm', formData);
      if(response.status === 200) {
        alert("Your details saved. We will get back to you soon");
      }
      console.log('Form submitted successfully:', response.data);
      // Reset form and state
      setFormData({ name: '', email: '', message: '' });
      setHaveQuestion(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

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
      <nav>
        <NavLink to="debts">Learn about Debts</NavLink><br />
        <NavLink to="risks">Risks</NavLink><br />
        <NavLink to="about">About</NavLink><br />
        <NavLink to="strategy">Strategy with Terminal</NavLink><br />

        <button onClick={fetchAndDisplayChart}>Show Graph</button>
      </nav>
      <h1>Home</h1>
      <button onClick={handleQuestion}>Leave Details</button>

      {haveQuestion && (
        <form onSubmit={handleSubmit}>
          <p>Leave your details and we will get back to you soon</p>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div><br />
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div><br />
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
          </div><br />
          <button type="submit">Send</button>
        </form>
      )}

      <div className="App">
        <h1>Stock Data Analysis</h1>
        <canvas id="executionResultsChart" width="400" height="200"></canvas>
      </div>

      <Outlet />
    </>
  );
}
