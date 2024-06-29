// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// function GetGraph() {
//   const [chartData, setChartData] = useState({});

//   const fetchData = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/fetchData', {
//         stockSymbol: 'AAPL',
//         startDate: '2022-01-01',
//         endDate: '2023-01-01'
//       });

//       const data = response.data;
//       const dates = data.map(d => new Date(d.date).toLocaleDateString());
//       const closePrices = data.map(d => d.close);

//       setChartData({
//         labels: dates,
//         datasets: [
//           {
//             label: 'Close Price',
//             data: closePrices,
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//             fill: false
//           }
//         ]
//       });
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="GetGraph">
//       <h1>Stock Data Analysis</h1>
//       {chartData.labels ? (
//         <Line data={chartData} />
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }

// export default GetGraph;
