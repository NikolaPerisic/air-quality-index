const express = require("express");
const app = express();
const request = require("request");
const axios = require('axios');
require('dotenv').config()

app.set("view engine", "ejs");
let data;

let date = new Date().toISOString().slice(0, 10);
let hour = `${new Date().getHours() - 2}:00`;

axios.get(`http://data.sepa.gov.rs/api/3/action/datastore_search?resource_id=${process.env.KEY}&q=${date}T${hour}`)
  .then(function (response) {
    console.log(hour);
    data = response.data.result;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

app.get('/', (req, res) => {
  res.send(data.records);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`app running on port ${PORT}`);
});