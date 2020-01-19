const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.json());

const fileName = `${__dirname}/cars.json`;
const carsList = require(fileName);
const cars = JSON.parse(fs.readFileSync("./cars.json", "utf8"));

//Returns full cars list
app.get("/api/carslist", (req, res) => {
  console.log("Sending cars list...");
  res.status(200).json(carsList);
});

//Returns cars with exact id
app.get("/api/carslist/id/:id", (req, res) => {
  console.log(`Finding the car with id ${req.params.id}`);
  const idReq = req.params.id;
  const filteredCar = cars.data.filter(key => {
    return key.id == idReq;
  });
  res.send(filteredCar);
});

//Returns cars with exact model
app.get("/api/carslist/model/:model", (req, res) => {
  console.log(`Finding the car with model ${req.params.model}`);
  const modelReq = req.params.model;
  const filteredCar = cars.data.filter(key => {
    return key.model == modelReq;
  });
  res.send(filteredCar);
});

//Returns cars manufactured in specified year or later
app.get("/api/carslist/year/:year", (req, res) => {
  console.log(
    `Finding the car manufactured in year ${req.params.year} or later`
  );
  const yearReq = req.params.year;
  const filteredCar = cars.data.filter(key => {
    return key.releaseDate >= yearReq;
  });
  res.send(filteredCar);
});

//Deletes car with specified id
app.delete("/api/carslist/id/:id", (req, res) => {
  const idReq = req.params.id - 1;
  cars.data.splice(cars.data.indexOf(idReq), 1);
  console.log(`Deleting car with id ${idReq}`);
  res.status(200).send(`Deleting car with id ${idReq}`);
  fs.writeFile(fileName, JSON.stringify(cars), err => {
    if (err) return console.log(err);
  });
});

//Deletes car with specified model
app.delete("/api/carslist/model/:model", (req, res) => {
  const modelReq = req.params.model;
  cars.data.splice(cars.data.indexOf(modelReq), 1);
  console.log(`Deleting car with model ${modelReq}`);
  res.status(200).send(`Deleting car with model ${modelReq}`);
  fs.writeFile(fileName, JSON.stringify(cars), err => {
    if (err) return console.log(err);
  });
});

//Deletes car with specified manufacturer
app.delete("/api/carslist/name/:name", (req, res) => {
  const nameReq = req.params.name;
  cars.data.splice(cars.data.indexOf(nameReq), 1);
  console.log(`Deleting car manufacturer by :${nameReq}`);
  res.status(200).send(`Deleting car manufacturer by : ${nameReq}`);
  fs.writeFile(fileName, JSON.stringify(cars), err => {
    if (err) return console.log(err);
  });
});

//Adds new car to the list
app.post("/api/carslist", (req, res) => {
  const newInfo = req.body;
  carsList.data.push(newInfo);
  fs.writeFile(fileName, JSON.stringify(carsList), err => {
    if (err) return console.log(err);
    console.log(JSON.stringify(carsList));
    console.log("writing to " + fileName);
  });
});

module.exports = app;
