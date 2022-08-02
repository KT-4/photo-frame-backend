const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();
const Port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome Home!");
});

app.listen(Port, () => console.log(`Server runing on Port :${Port}`));
