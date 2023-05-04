const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/routes");
require("dotenv").config();

const port = process.env.PORT;

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts), bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log("Server started...");
});
