import * as React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Row, Col, Typography } from "antd";

const { Title, Paragraph } = Typography;

const BannerContainer = styled.div`
  background-color: #15151a;
  width: 100%;
  color: #fff;
`;

const StyledTitle = styled(Title)`
  &.ant-typography {
    font-size: 42px;
    color: #fff;
  }
`;

const BannerParagraph = styled(Paragraph)`
  &.ant-typography {
    color: #fff;
    font-size: 1.2rem;
  }
`;

const Banner = () => (
  <>
    {/* Banner */}
    <BannerContainer>
      
      {/* Menu */}
      {/* <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col xs={24} md={20}>
          <section style={{ display: "flex", justifyContent: "space-between" }}>
            <MenuItem>Logo</MenuItem>

            <section style={{ display: "flex", justifyContent: "space-between" }}>
              <MenuItem>Saiba mais sobre o beta</MenuItem>
              <MenuItem>Ferramentas</MenuItem>
              <MenuButton type="primary" size="large">
                Crie sua conta
              </MenuButton>
            </section>
          </section>
        </Col>
      </Row> */}

      <Row style={{ paddingTop: "4rem", paddingBottom: "2rem" }}>
        <Col xs={1} md={4}></Col>
        <Col xs={22} md={16}>
          <StyledTitle>Teoria de portfólio de Markowitz</StyledTitle>
          <BannerParagraph>
            Na criação de uma carteira de investimentos, geralmente, o investidor busca obter o maior retorno possível
            com o menor risco de perda. Neste sentido, a Teoria Moderna de Portfólios de Markowitz tende a nos auxiliar
            nas decisões a serem tomadas quando o assunto é o mercado financeiro. No modelo da média-variância de
            Markowitz, o retorno esperado e a volatilidade dos ativos são extremamente importantes para a seleção da
            carteira de investimento ótima.
          </BannerParagraph>

          <BannerParagraph>
            A teoria de Markowitz pressupõe a criação de uma carteira de investimento ótima de modo a maximizar o
            retorno esperado, ou, minimizar o risco do portfólio. Assim, de modo a atingir o objetivo estipulado, faz-se
            necessário a criação de um modelo matemático para auxiliar na seleção de ativos que irão compor tal
            carteira.
          </BannerParagraph>

          <BannerParagraph>
            A ferramenta proposta abstrai o modelo matemático e auxilia os investidores na tomada de decisão na seleção
            de ativos
          </BannerParagraph>
        </Col>
        <Col xs={1} md={4}></Col>
      </Row>
    </BannerContainer>
  </>
);

export default Banner;
