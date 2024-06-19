// src/fetchStockData.js
import axios from 'axios';

export const fetchStockData = async (stockSymbol, startDate, endDate) => {
  try {
    const response = await axios.post('http://localhost:3000/fetchData', {
      stockSymbol,
      startDate,
      endDate
    });

    const data = response.data;
    const dates = data.map(d => new Date(d.date).toLocaleDateString());
    const closePrices = data.map(d => d.close);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Close Price',
          data: closePrices,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
