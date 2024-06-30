import React, { useState } from "react";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { Line } from 'react-chartjs-2';

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
      const response = await axios.post('http://localhost:3000/submitForm', formData)
      if(response.status==200)
        alert("Your details saved. we will be back soon");
      console.log('Form submitted successfully:', response.daa);
      // Reset form and state
      setFormData({ name: '', email: '', message: '' });
      setHaveQuestion(false);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
