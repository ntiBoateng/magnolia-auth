const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/users");

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_LINK}/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    dbName: "MagnoliaAuth",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.send({
    error: true,
    message: "Server is healthy proceed to action",
  });
});

app.use("/users", authRoutes);

app.listen(PORT, () => {
  console.log("Server started listening on PORT : " + PORT);
});
