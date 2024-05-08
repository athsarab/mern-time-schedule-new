const express = require("express");
const dbConnection = require("./config/db");
const routesnew = require("./routes/sheduleRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors({ origin: true, credentials: true}));


//DB Connection
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/",(req,res) => res.send("Hello server is running .."));

app.use("/api/schedule",routesnew);
 
const PORT = 3000;

app.listen(PORT, () =>console.log("Server is runnig on PORT "+PORT));
