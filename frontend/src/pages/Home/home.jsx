import * as React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import { Row, Col, Typography } from "antd";
import Banner from "./Banner";
import HistoricalReturnsChart from "./HistoricalReturnsChart";
import AcumHistoricalReturnsChart from "./AcumHistoricalReturnsChart";
import Markowitz from "./Markowitz";
import Selection from "./Selection"; 
import axios from "axios";
import moment from "moment";
import _ from "lodash";

const { Paragraph } = Typography;

function Home() {
  const [lastNDays, setLastNDays] = useState(200);
  const [portfolioQuantity, setPortfolioQuantity] = useState(20000);
  const [stocksHistory, setStocksHistory] = useState({});

  const calculateMarkowitz = async (stocks) => {
    await fetchPricesAndReturnsHistory(stocks);
  };

  const fetchPricesAndReturnsHistory = async (stocks) => {
    setStocksHistory({});
 
    const dateFrom = moment().subtract(lastNDays, "days").format("YYYY-MM-DD");
    const dateTo = moment().format("YYYY-MM-DD");

    let newHistoric = {};

    await Promise.all(
      stocks.map(async (ticker) => {
        let historic = await axios.get(
          `http://localhost:3100/api/stocks?ticker=${ticker}.SA&from=${dateFrom}&to=${dateTo}&period=d`
        );
        historic = historic.data.map((data) => _.pick(data, ["date", "close"]));
        historic = _.reverse(historic);
        historic = historic.filter((stockDay) => !!stockDay.close);
        historic = historic.map((stockDay, index) => {
          return _.set(stockDay, "var", index > 0 ? stockDay.close / historic[index - 1].close - 1 : 0);
        });

        newHistoric[ticker] = historic;
      })
    );
    setStocksHistory(newHistoric);
  };

  return (
    <div>
      <Banner />
      <Selection
        calculateMarkowitz={calculateMarkowitz}
        lastNDays={lastNDays}
        portfolioQuantity={portfolioQuantity}
        setLastNDays={setLastNDays}
        setPortfolioQuantity={setPortfolioQuantity}
      />

      <Row>
        <Col xs={0} md={4}></Col>
        <Col xs={24} md={16}>
          <HistoricalReturnsChart historicData={stocksHistory} lastNDays={lastNDays} />
          <AcumHistoricalReturnsChart historicData={stocksHistory} />
          <Markowitz historicData={stocksHistory} portfolioQuantity={portfolioQuantity} />
        </Col>
        <Col xs={0} md={4}></Col>
      </Row>

      <Row style={{ marginTop: "2rem" }}>
        <Col xs={0} md={4} style={{ backgroundColor: "#f2f3f6" }}></Col>
        <Col xs={24} md={16} style={{ backgroundColor: "#f2f3f6", paddingTop: "2rem", paddingBottom: "1rem" }}>
          <Paragraph style={{ textAlign: "justify", lineHeight: "1rem" }}>
            Disclaimer: As informações aqui disponibilizadas possuem caráter educacional, genérico e não constituem
            aconselhamento ou recomendação de investimentos, solicitação de compra ou venda de valores mobiliários,
            produtos, serviços ou quaisquer ativos financeiros. As Informações não se destinam e não foram objeto de
            avaliação sobre sua adequação ao perfil de investidores individuais ou grupo de investidores específicos. A
            incorporação das Informações a eventual decisão de investimento deverá ser efetuada após a análise
            independente pelo investidor, com base em todas as informações relevantes publicamente disponíveis. As
            Informações foram obtidas de fontes publicamente disponíveis e não foram objeto de investigação, sobre sua
            veracidade, consistência, completude, suficiência ou atualidade. Este site não poderá ser responsabilizado
            por quaisquer perdas e danos ou lucros cessantes porventura resultantes de sua utilização.
          </Paragraph>
        </Col>
        <Col xs={0} md={4} style={{ backgroundColor: "#f2f3f6" }}></Col>
      </Row>

      {/* <Footer /> */}
    </div>
  );
}

export default Home;
