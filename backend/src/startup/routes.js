const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors"); 
const stocks = require("../resources/stocks/stocks.routing");
const users = require("../resources/users/users.routing");
const error = require("../middlewares/error_handler.middleware");

module.exports = (app) => {
   const corsOptions = {
      origin: "*",
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
   };

   // Cors Middlewares
   app.use(body_parser.json({ limit: "50mb" }));
   app.use(body_parser.urlencoded({ limit: "50mb", extended: true }));
   app.use(body_parser.json({ type: "application/vnd.api+json" }));
   app.use(express.json());
   app.use(cors(corsOptions)); 

   // Routes
   app.get("/", (req, res) => res.redirect("/api-docs"));
   app.get('/status', function (req, res) {res.send({"status":"200"})})
   app.use("/api/stocks", stocks);
   app.use("/api/users", users);
   
   // Middlewares functions
   app.use(error);
};
