import * as React from "react";
import { useState, useEffect } from "react";
import { Typography } from "antd";
import _ from "lodash";
import createPlotlyComponent from "react-plotly.js/factory";
import "antd/dist/antd.css";
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

const { Title, Paragraph } = Typography;

function HistoricalReturnsChart(props) {
  const [returnsHistory, setReturnsHistory] = useState([]);

  useEffect(() => {
    console.log(JSON.stringify(props.historicData));
    let returnList = [];
    Object.keys(props.historicData).forEach((ticker) => {
      let stockData = _.map(props.historicData[ticker], (element) => element.var);
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
      <Title level={2}>Histórico de retorno</Title>
      <Paragraph>
        No gráfico abaixo estão plotados os retornos diários de cada um dos ativos selecionados. Através dele é possível
        ter uma percepção da volatilidade dos ativos ao longo do tempo. Clique nas legendas para ocultar/exibir uma
        curva de dados.
      </Paragraph>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {
            <Plot
              data={returnsHistory}
              layout={{ title: "Histórico de retorno dos ativos", xaxis: { title: "dias" }, yaxis: { title: "variação %" } }}
            />
          }
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default HistoricalReturnsChart;
