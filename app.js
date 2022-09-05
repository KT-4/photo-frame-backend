const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multiparty = require('multiparty-express')
require("dotenv").config();
require("./config/db");

const appRoutes = require("./routes/index");
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");

const app = express();
const Port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", appRoutes);

app.post("/welcome",auth,(req, res) => {
  res.send("Welcome Home!");
});
app.get("/welcome",admin,(req,res)=>{
   res.send("welcome from admin")
})

// Create a Server
app.listen(Port, () => console.log(`Server runing on Port :${Port}`));
