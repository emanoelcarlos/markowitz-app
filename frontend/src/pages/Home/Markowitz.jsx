import * as React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Table, Typography } from "antd";
import _ from "lodash"; 
import createPlotlyComponent from "react-plotly.js/factory";
import "antd/dist/antd.css";

const { Column, ColumnGroup } = Table;
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

const { Title, Paragraph } = Typography;

function Markowitz(props) {
  const PORTFOLIO_QUANTITY = 10000;

  let portfolioWeights = [];
  const [portfolioWeightsState, setPortfolioWeightsState] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState({});

  let covarianceMatrix = [];
  //const [covarianceMatrix, setCovarianceMatrix] = useState([]);

  let portfoliosReturns = [];
  let portfoliosAnnualReturns = {};
  let portfoliosCovariances = [];
  let portfoliosSharpe = [];

  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => { 
    if (Object.keys(props.historicData).length) {
      console.log("Generating weights ...");
      generateWeights(props.historicData);
      console.log("portfolioWeights", portfolioWeights);

      console.log("Calculating portfolio weights ...");
      calculateAnnualReturn(props.historicData);
      console.log("portfoliosAnnualReturns", portfoliosAnnualReturns);

      console.log("Generating covariance matrix ...");
      generateCovarianceMatrix(props.historicData);
      console.log("covarianceMatrix", covarianceMatrix);

      console.log("Calculating portfolios return ...");
      calculatePortfolioReturn(portfolioWeights, props.historicData);
      console.log("portfoliosReturns", portfoliosReturns);

      console.log("Calculating portfolios covariance ...");
      calculatePortfolioVariance(portfolioWeights, props.historicData, covarianceMatrix);
      // calculatePortfolioVariance2(portfolioWeights, props.historicData);
      console.log("portfoliosCovariances", portfoliosCovariances);

      console.log("Calculating sharpe ...");
      portfoliosSharpe = portfoliosCovariances.map((cov, index) => portfoliosReturns[index] / cov);

      console.log(portfoliosSharpe);
      console.log(
        [portfoliosCovariances[portfoliosSharpe.indexOf(Math.max(...portfoliosSharpe))]],
        [portfoliosReturns[portfoliosSharpe.indexOf(Math.max(...portfoliosSharpe))]]
      );
      console.log("Painting portfolios ...");
      setPortfolios([
        {
          x: portfoliosCovariances,
          y: portfoliosReturns,
          mode: "markers",
          type: "scatter",
          name: "",
          marker: {
            size: 3,
            color: portfoliosSharpe,
            colorbar: {
              title: "Sharpe ratio",
            },
            colorscale: "RdYlGn",
          },
        },
        {
          x: [portfoliosCovariances[portfoliosSharpe.indexOf(Math.max(...portfoliosSharpe))]],
          y: [portfoliosReturns[portfoliosSharpe.indexOf(Math.max(...portfoliosSharpe))]],
          mode: "markers",
          type: "scatter",
          name: "",
          marker: {
            size: 5,
            color: "#000",
          },
        },
      ]);
    }
  }, [props.historicData]);

  const generateWeights = (allData) => {
    let tickers = Object.keys(allData);
    for (let i = 0; i < PORTFOLIO_QUANTITY; i++) {
      let auxiliarWeightsArray = [...Array(tickers.length)].map(() => Math.random());
      auxiliarWeightsArray = auxiliarWeightsArray.map((element) => (element / _.sum(auxiliarWeightsArray)).toFixed(4));

      let newPortfolio = [];
      tickers.forEach((tickerName, index) => {
        newPortfolio[tickerName] = auxiliarWeightsArray[index];
      });
      portfolioWeights.push(newPortfolio);
    }
    setPortfolioWeightsState(portfolioWeights);
  };

  const calculateAnnualReturn = (allData) => {
    Object.keys(allData).forEach((ticker) => {
      let acumReturn = 1;
      let stockData = allData[ticker].map((element, index) => {
        if (index > 0) {
          acumReturn = acumReturn * (element.var + 1);
          return acumReturn - 1;
        } else {
          acumReturn = element.var + 1;
          return acumReturn - 1;
        }
      });
      portfoliosAnnualReturns[ticker] = _.last(stockData);
    });
  };

  const calculateCovariance = (array1, array2) => {
    if (array1.length !== array2.length) {
      console.log("Error on covariance calculation. Both arrays must have equal lengths.");
      return null;
    }

    let sum = 0;
    let covariance = 0;

    let meanX = _.mean(array1);
    let meanY = _.mean(array2);

    for (let i = 0; i < array1.length; i++) sum = sum + (array1[i] - meanX) * (array2[i] - meanY);
    covariance = sum / (array1.length - 1);

    return covariance;
  };

  const generateCovarianceMatrix = (allData) => {
    const tickers = Object.keys(allData);
    let auxCovarianceMatrix = [];

    tickers.forEach((tickerName1, index1) => {
      auxCovarianceMatrix[index1] = Array(tickers.length);
      tickers.forEach((tickerName2, index2) => {
        let calculation = calculateCovariance(
          getData(allData, tickerName1, "var"),
          getData(allData, tickerName2, "var")
        );
        auxCovarianceMatrix[index1][index2] = calculation.toFixed(5);
      });
    });

    covarianceMatrix = auxCovarianceMatrix;
  };

  const calculatePortfolioReturn = (portfolioWeights, allData) => {
    const tickers = Object.keys(allData);
    portfolioWeights.forEach((portfolioWeights) => {
      let calculatedReturn = 0;
      tickers.forEach((tickerName) => {
        calculatedReturn += portfolioWeights[tickerName] * portfoliosAnnualReturns[tickerName];
      });
      portfoliosReturns.push(calculatedReturn);
    });
  };

  const calculatePortfolioVariance = (allPortfolioWeights, allData, covarianceMatrix) => {
    const tickers = Object.keys(allData);
    allPortfolioWeights.forEach((portfolioWeights) => {
      // let calculation = portfolioWeights[ticker1] * portfolioWeights[ticker2] * covarianceMatrix[index1][index2];
      let calculation = calculateVariance(tickers, portfolioWeights, covarianceMatrix);
      calculation = Math.sqrt(calculation);
      portfoliosCovariances.push(calculation);
    });
  };

  // const calculatePortfolioVariance2 = (allPortfolioWeights, allData) => {
  //   const tickers = Object.keys(allData);

  //   allPortfolioWeights.forEach((portfolioWeight) => {
  //     let result = [];
  //     for (let i = 0; i < allData[tickers[0]].length; i++) {
  //       tickers.forEach((ticker) => {
  //         // console.log(portfolioWeight[ticker], allData[ticker][i].var);
  //         let dailyReturn = portfolioWeight[ticker] * allData[ticker][i].var;
  //         result.push(dailyReturn);
  //       });
  //     }
  //     portfoliosCovariances.push(math.std(result));
  //   });
  // };

  const calculateVariance = (tickers, weights, covarianceMatrix) => {
    let wT_Cov_Matrix = [];
    let wT_Cov_w_Matrix = 0;

    // console.log(weights);
    for (let i = 0; i < covarianceMatrix.length; i++) {
      let acum = 0;
      for (let j = 0; j < Object.keys(weights).length; j++) {
        // console.log(weights[tickers[j]], covarianceMatrix[j][i]);
        acum += weights[tickers[j]] * covarianceMatrix[j][i] * 252;
      }
      wT_Cov_Matrix.push(acum);
    }

    // console.log("wT_Cov_Matrix", wT_Cov_Matrix);

    for (let i = 0; i < wT_Cov_Matrix.length; i++) {
      wT_Cov_w_Matrix += wT_Cov_Matrix[i] * weights[tickers[i]];
    }

    return wT_Cov_w_Matrix;
  };

  const getData = (allData, ticker, attribute) => {
    return allData[ticker].map((element) => element[attribute]);
  };

  return (
    <section style={{ marginTop: "2rem" }}>
      <Title level={2}>Fronteira eficiente</Title>
      <Paragraph>De acordo com as configurações, foram gerados {props.portfolioQuantity} portfolios.</Paragraph>
      <Row justify="center">
        <Col>
          <Plot
            data={portfolios}
            onClick={(plotly_click) => {
              console.log(plotly_click);
              console.log(plotly_click.points[0].pointIndex);
              console.log(portfolioWeightsState[plotly_click.points[0].pointIndex]);
              setSelectedPortfolio(portfolioWeightsState[plotly_click.points[0].pointIndex]);
              let aux = portfolioWeightsState[plotly_click.points[0].pointIndex];

              console.log(
                Object.keys(aux).map((ticker, index) => {
                  return {
                    key: index,
                    ticker: ticker,
                    weight: aux[ticker],
                  };
                })
              );
            }}
            layout={{
              title: "Portfolios",
              hovermode: "closest",
              colorscale: {
                diverging: [
                  ["0", "#a50026"],
                  ["0.1111111", "#d73027"],
                  ["0.2222222", "#f46d43"],
                  ["0.3333333", "#fdae61"],
                  ["0.4444444", "#fee08b"],
                  ["0.5555555", "#ffffbf"],
                  ["0.6666666", "#d9ef8b"],
                  ["0.7777777", "#a6d96a"],
                  ["0.8888888", "#66bd63"],
                  ["0.9999999", "#1a9850"],
                  ["1.0", "#006837"],
                ],
              },
              xaxis: { title: "risco" }, 
              yaxis: { title: "retorno" }
            }}
          />
        </Col>
      </Row>

      <Paragraph>O ponto preto, destacado no gráfico acima, indica o portolfio com o melhor Índice Sharpe.</Paragraph>

      <Paragraph>
        Clique em um portfolio, no gráfico acima, para visualizar os pesos que compõem a sua carteira.
      </Paragraph>

      <Row justify="center">
        <Col>
          <Table
            size="middle"
            pagination={{ position: ["none", "none"] }}
            dataSource={Object.keys(selectedPortfolio).map((ticker, index) => {
              return {
                key: index,
                ticker: ticker,
                weight: (selectedPortfolio[ticker] * 100).toFixed(2),
              };
            })}
          >
            <ColumnGroup title="Composição da carteira">
              <Column title="Ativo" key="ticker" dataIndex="ticker" />
              <Column title="Peso" key="weight" dataIndex="weight" />
            </ColumnGroup>
          </Table>
        </Col>
      </Row>
    </section>
  );
}

export default Markowitz;
