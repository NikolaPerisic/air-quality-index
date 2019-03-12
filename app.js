const express = require("express");
const app = express();
const request = require("request");
const axios = require("axios");
require("dotenv").config();
const stations = require("./data/station.json");

app.set("view engine", "ejs");
let data;

const apicallfunc = () => {
    let date = new Date().toISOString().slice(0, 10);
    let hour = `${new Date().getHours() - 2}:00`;
    hour.length === 4 ? (hour = `0${hour}`) : hour;

    console.log(date);
    console.log(hour);

    axios
        .get(
            `http://data.sepa.gov.rs/api/3/action/datastore_search?resource_id=${
                process.env.KEY
            }&q=${date}T${hour}`
        )
        .then(function(response) {
            data = [...response.data.result.records];
            data = data.map(el => {
                let city = stations[el.station_id - 1];
                if (city) {
                    return Object.assign(el, city);
                }
            });
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        });
};
apicallfunc();
setInterval(apicallfunc, 3600000);

app.get("/", (req, res) => {
    res.send(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log(`app running on port ${PORT}`);
});
