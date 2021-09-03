const express = require("express");
const router = express.Router();
const stocksController = require("./stocks.controller");

router.get("/", [], stocksController.getHistory);

module.exports = router;

// GET '/'
/**
 * @swagger
 *
 * /stocks:
 *   get:
 *     summary: Provides the price history of a stock
 *     description: Receive as parameter the initial date, final date and period type
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Stocks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ticker
 *         description: Stocker ticker
 *         in: query
 *         required: true
 *         type: string
 *       - name: from
 *         description: Initial date
 *         in: query
 *         required: true
 *         type: string
 *       - name: to
 *         description: Final date
 *         in: query
 *         required: true
 *         type: string
 *       - name: period
 *         description: period type. 'd' (daily), 'w' (weekly), 'm' (monthly). Default is 'd'
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: It is valid request
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
