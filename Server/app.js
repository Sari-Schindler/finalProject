
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { fetchStockData } from './fetchStockData';

// function App() {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       const data = await fetchStockData('AAPL', '2022-01-01', '2023-01-01');
//       setChartData(data);
//     };

//     getData();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Stock Data Analysis</h1>
//       {chartData ? (
//         <Line data={chartData} />
//       ) : (
//         <p>Loading dataaaaa...</p>
//       )}
//     </div>
//   );
// }


import express from "express";
import 'dotenv/config';
import usersRouter from "./routes/usersRoute.js";
import registerRouter from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";
import cors from "cors";
import authenticateToken from "./middleware/authenticateToken.js";

const app = express();
// Other middleware
app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use(authenticateToken);
app.use("/users", usersRouter);

//Starting the server
app.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));
