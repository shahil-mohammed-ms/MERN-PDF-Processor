/*******************************************************
 *      Server Starts From Here                        *
 *******************************************************/

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("../src/db/Mongoose/mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({   
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); 

app.use(bodyParser.json());

// const demoRouter = require('../Route/demo')
const routes = require('../Route/index')

app.use("/image", express.static(path.join(__dirname, "../Public")));

// Use Routes
// app.use('/demo',demoRouter)
app.use('/api', routes);





app.listen(5000, () => {
  console.log("Server started on port 5000");
});

module.exports = app;