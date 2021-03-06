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
            Disclaimer: As informa????es aqui disponibilizadas possuem car??ter educacional, gen??rico e n??o constituem
            aconselhamento ou recomenda????o de investimentos, solicita????o de compra ou venda de valores mobili??rios,
            produtos, servi??os ou quaisquer ativos financeiros. As Informa????es n??o se destinam e n??o foram objeto de
            avalia????o sobre sua adequa????o ao perfil de investidores individuais ou grupo de investidores espec??ficos. A
            incorpora????o das Informa????es a eventual decis??o de investimento dever?? ser efetuada ap??s a an??lise
            independente pelo investidor, com base em todas as informa????es relevantes publicamente dispon??veis. As
            Informa????es foram obtidas de fontes publicamente dispon??veis e n??o foram objeto de investiga????o, sobre sua
            veracidade, consist??ncia, completude, sufici??ncia ou atualidade. Este site n??o poder?? ser responsabilizado
            por quaisquer perdas e danos ou lucros cessantes porventura resultantes de sua utiliza????o.
          </Paragraph>
        </Col>
        <Col xs={0} md={4} style={{ backgroundColor: "#f2f3f6" }}></Col>
      </Row>

      {/* <Footer /> */}
    </div>
  );
}

export default Home;
