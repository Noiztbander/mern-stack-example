const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const mongoose= require("./database/database");

// congif
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
//Esto comprueba si el mensage que recive desde el cliente, es en formato Json.
app.use(express.json());

// routes
app.use("/api/",require("./routes/task-routes"));

// satic files
app.use(express.static(path.join(__dirname, "public")));

// starting the server
app.listen(app.get("port"),()=>{
	console.log("server on port", app.get("port"));
})