import * as React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Form, Row, Col, Typography, Input, InputNumber, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const StockSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 40px;
  background: #f2f3f6;
`;

const SelectInput = styled(Input)`
  &.ant-input-lg {
    font-size: 36px;
    text-align: center;
    color: #000000;
    border-radius: 8px;
    border: none;
  }
`;

const SelectionTitle = styled(Title)`
  &.ant-typography {
    font-size: 26px;
    color: #000000;
  }
`;

const SelectionParagraph = styled(Paragraph)`
  &.ant-typography {
    color: black;
    font-size: 1rem;
  }

  &:hover {
    font-weight: bold;
  }
`;

const MenuButton = styled(Button)`
  margin-top: 1.5rem;
  background-color: #ffb038;
  color: black;
  border-radius: 8px;
  max-width: 25rem;
`;

const Selection = (props) => {
  // const [stockList, setStockList] = useState(["BBSE3", "TAEE11", "ITSA4", "ABEV3", "GOAU4", "BRML3"]);
  // const [stockList, setStockList] = useState(["BBSE3", "BOVA11", "AMAR3", "BPAC3", "VALE3"]);
  const [stockList, setStockList] = useState([]);
  const [isAddingTicker, setIsAddingTicker] = useState(false);
  const [tickerToAdd, setTickerToAdd] = useState("");

  const [showSettings, setShowSettings] = useState(false);

  const updateStockList = (tickerIndex) => {
    setStockList(stockList.filter((element, index) => index !== tickerIndex));
  };

  const addTicker = (tickerName) => {
    setStockList([...stockList, tickerName]);
    setIsAddingTicker(false);
    setTickerToAdd("");
  };

  const onPressENTER = (event) => {
    if (event.key === "Enter") addTicker(tickerToAdd);
    if (event.keyCode === 27) {
      setIsAddingTicker(false);
      setTickerToAdd("");
    }
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <StockSelectionContainer>
            <SelectionTitle style={{ marginBottom: "1rem" }}>
              Selecione os ativos que deseja compor a carteira
            </SelectionTitle>

            <section
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {stockList.map((ticker, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <div
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#e6e6e6",
                      height: "1.2rem",
                      width: "1.2rem",
                      position: "absolute",
                      top: ".6rem",
                      right: ".6rem",
                      zIndex: "1000",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CloseOutlined onClick={() => updateStockList(index)} style={{ fontSize: "0.8rem" }} />
                  </div>
                  <SelectInput
                    size="large"
                    placeholder="IBOV"
                    value={ticker}
                    style={{ maxWidth: "10rem", margin: "1rem", border: "solid 1px #b3b3b3" }}
                  />
                </div>
              ))}

              {isAddingTicker ? (
                <SelectInput
                  size="large"
                  placeholder="ABCD4"
                  style={{ maxWidth: "10rem", margin: "1rem", border: "solid 1px #b3b3b3" }}
                  value={tickerToAdd.toUpperCase()}
                  onInput={(e) => setTickerToAdd(e.target.value)}
                  onKeyDown={onPressENTER}
                />
              ) : (
                <SelectionParagraph
                  onClick={() => setIsAddingTicker(true)}
                  style={{ fontWeight: "bold", cursor: "pointer", margin: "1rem" }}
                >
                  Adicionar ativo
                </SelectionParagraph>
              )}
            </section>

            <MenuButton onClick={() => props.calculateMarkowitz(stockList)} block size="large">
              Analisar
            </MenuButton>

            <SelectionParagraph style={{ marginTop: "20px", cursor: "pointer" }} onClick={() => {
              setShowSettings(!showSettings)
            }}>
              Configurações avançadas
            </SelectionParagraph>

            {showSettings && (
              <section style={{ width: "100%" }}>
                <Form name="basic" labelCol={{ span: 12 }} wrapperCol={{ span: 2 }}>
                  <Form.Item
                    label="Dias de cotação"
                    rules={[{ required: true, message: "Informe a quantidade de dias de cotação" }]}
                  >
                    <InputNumber value={props.lastNDays} onChange={props.setLastNDays} />
                  </Form.Item>

                  <Form.Item
                    label="Número de Portfolios"
                    rules={[{ required: true, message: "Informe a quantidade de portfolios" }]}
                  >
                    <InputNumber value={props.portfolioQuantity} onChange={props.setPortfolioQuantity} />
                  </Form.Item>
                </Form>
              </section>
            )}
          </StockSelectionContainer>
        </Col>
      </Row>
    </>
  );
};

export default Selection;
