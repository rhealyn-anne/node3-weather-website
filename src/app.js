const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views  location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// SEtup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rhealyn Anne",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rhea",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "What can I help you today?",
    title: "Help",
    name: "Rhea",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Welcome Ganda</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Rhea",
//     },
//     {
//       age: 22,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>Hello</h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send({
//     forecast: "It is snowing",
//     location: "Philppines",
//   });
// });

///////////the QUERY STRING
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  /////////////BUILDING A JSON HTTP ENDPOINT
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //   res.send({
  //     forecast: "It is snowing",
  //     location: "Philippines",
  //     address: req.query.address,
  //   });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// app.com
// app.com/help
//app.com/about

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rhea",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rhealyn",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
