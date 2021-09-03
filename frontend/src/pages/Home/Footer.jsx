import * as React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Row, Col, Typography } from "antd";

const { Text } = Typography;

const BackgroundFooter = styled.div`
   background-color: #15151a;
   width: 100%;
   color: #fff; 
`;

const MenuItem = styled(Text)`
   &.ant-typography {
      color: #fff;
      font-size: 1.1rem;
      margin: 1.3rem;
   }
`;

const Footer = () => (
   <>
      {/* Banner */}
      <BackgroundFooter>
         {/* Menu */}
         <Row>
            <Col xs={0} md={2}></Col>
            <Col xs={24} md={20}>
               <section
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100px" }}
               >
                  {/* Logo */}
                  <MenuItem>Logo</MenuItem>

                  {/* Itens de menu */}
                  <section style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                     <MenuItem>Contato</MenuItem>
                     <MenuItem>Sobre</MenuItem>
                     <MenuItem>Termos de uso</MenuItem>
                  </section>
               </section>
            </Col>
            <Col xs={0} md={2}></Col>
         </Row>
      </BackgroundFooter>
   </>
);

export default Footer;
