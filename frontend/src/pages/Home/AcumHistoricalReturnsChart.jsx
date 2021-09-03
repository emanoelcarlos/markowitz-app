import * as React from "react";
import { useState, useEffect } from "react";
import { Typography } from "antd";
import createPlotlyComponent from "react-plotly.js/factory";
import "antd/dist/antd.css";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

const { Title, Paragraph } = Typography;

function AcumHistoricalReturnsChart(props) {
  const [returnsHistory, setReturnsHistory] = useState([]);

  useEffect(() => {
    let returnList = [];
    Object.keys(props.historicData).forEach((ticker) => {
      let acumReturn = 1;
      let stockData = props.historicData[ticker].map((element, index) => {
        if (index > 0) {
          acumReturn = acumReturn * (element.var + 1);
          return acumReturn - 1;
        } else {
          acumReturn = element.var + 1;
          return acumReturn - 1;
        }
      });

      returnList.push({
        name: ticker,
        x: stockData.length,
        y: stockData,
        type: "scatter",
      });
    });

    setReturnsHistory(Object.keys(props.historicData).length ? returnList : []);
  }, [props.historicData]);

  return (
    <section style={{ marginTop: "2rem" }}>
      <Title level={2}>Histórico de retorno acumulado</Title>
      <Paragraph>
        Abaixo estão ilustrados os retornos acumulados dos ativos dentro do período de datas analisado. Clique nas legendas para ocultar/exibir uma curva de dados.
      </Paragraph>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {<Plot data={returnsHistory} layout={{ title: "Histórico de retorno dos ativos", xaxis: { title: "dias" }, yaxis: { title: "variação acumulada %" } }} />}
        </div>
      </div>
    </section>
  );
}

export default AcumHistoricalReturnsChart;
