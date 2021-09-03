const debug = require("debug")("controller:stocks");
const HttpStatus = require("http-status-codes");
const yahooFinance = require("yahoo-finance");
const axios = require("axios");
// const deviceService = require("../devices/devices.service");

exports.getHistory = async (req, res) => {
  try {
    //Validate apikey
    // let keyExists = apiKeyInController.proceedGet({ key: req.header("apikey") });
    // if (!keyExists) res.status(HttpStatus.BAD_REQUEST).send({ message: "Missing API Key" });

    let result = await yahooFinance.historical({
      symbol: req.query.ticker,
      from: req.query.from,
      to: req.query.to,
      period: req.query.period,
    });

    res.status(HttpStatus.CREATED).send(result);
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

const formatParameters = (query) => {
  let startYear = query.from.substring(0, 4);
  let startMonth = query.from.substring(5, 7);
  let startDay = query.from.substring(8);

  let endYear = query.from.substring(0, 4);
  let endMonth = query.from.substring(5, 7);
  let endDay = query.from.substring(8);

  console.log(`${startYear},${startMonth},${startDay}`);
  return [];
};
