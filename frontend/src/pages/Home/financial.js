const yahooFinance = require("yahoo-finance");

const fetchStock = (ticker) => {
   console.log("fetch stock ", ticker);
   return new Promise((resolve) => {
      yahooFinance.historical(
         {
            symbol: ticker,
            from: "2020-01-01",
            to: "2020-12-04",
            period: "d",
            // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
         },
         (err, quotes) => {
            console.log(quotes);
            resolve(quotes);
         }
      );
   });
};

exports.fetchStock = fetchStock;
