import * as React from "react";
import { useState, useEffect } from "react";
import * as math from "mathjs";
import moment from "moment";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

export const TableHeader = styled.div`
   font-weight: bold;
   font-size: 34px;
   text-align: center;
   line-height: 4.5rem;
   color: #000000;
   background: #f4f4f6;
   border-radius: 12px 12px 0px 0px;
   border-bottom: 6px solid black;
`;

const TableLabel = styled.td`
   font-size: 18px;
   padding-left: 2rem;
   line-height: 2.1rem;
   color: #000000;
`;

const TableData = styled.td`
   font-size: 18px;
   line-height: 2.2rem;
   color: #000000;
`;

// https://mathjs.org/download.html
// https://www.investopedia.com/ask/answers/102714/how-do-you-calculate-beta-excel.asp

const BetaResult = (props) => {
   useEffect(() => {
      let varianceStockA = 0;
      let covarianceStockAB = 0;

      if (props.datasetStockA.length > 0) varianceStockA = math.variance(props.datasetStockA.map((elem) => elem.close));

      if (props.datasetStockA.length > 0 && props.datasetStockB.length > 0)
         covarianceStockAB = covariance(
            props.datasetStockA.map((elem) => elem.close),
            props.datasetStockB.map((elem) => elem.close)
         );

      console.log(varianceStockA, covarianceStockAB);
   }, [props]);

   const calculateBeta = () => {
      let varianceStockA = 0;
      let covarianceStockAB = 0;

      if (props.datasetStockA.length > 0) varianceStockA = math.variance(props.datasetStockA.map((elem) => elem.close));

      if (props.datasetStockA.length > 0 && props.datasetStockB.length > 0)
         covarianceStockAB = covariance(
            props.datasetStockA.map((elem) => elem.close),
            props.datasetStockB.map((elem) => elem.close)
         );

      console.log(varianceStockA, covarianceStockAB);

      if (varianceStockA > 0) return covarianceStockAB / varianceStockA;
      else return 0;
   };

   const covariance = (X, Y) => {
      if (X.length !== Y.length) {
         throw Error("X.length must match Y.length");
      }

      const length = X.length;
      const meanX = math.mean(X);
      const meanY = math.mean(Y);

      let covariance = 0;

      for (let i = 0; i < length; i++) {
         covariance += (X[i] - meanX) * (Y[i] - meanY);
      }

      return covariance / length;
   };

   const getFirstDate = () => {
      if (props.datasetStockA.length) return props.datasetStockA[0].date;
      else return "";
   };

   const getLastDate = () => {
      if (props.datasetStockA.length) return props.datasetStockA[props.datasetStockA.length - 1].date;
      else return "";
   };

   return (
      <section style={{ marginTop: "4rem" }}>
         <Title style={{ marginBottom: "54px" }}>Resultado do cálculo</Title>
         <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <table style={{ width: "600px" }}>
               <thead>
                  <tr>
                     <th colSpan={2}>
                        <TableHeader>β = {calculateBeta().toFixed(2)}</TableHeader>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <TableLabel>Período</TableLabel>
                     <TableData>
                        {getFirstDate()
                           ? `${moment(getFirstDate()).format("DD/MM/YYYY")} a ${moment(getLastDate()).format(
                                "DD/MM/YYYY"
                             )}`
                           : "-"}
                     </TableData>
                  </tr>
                  <tr>
                     <TableLabel># meses</TableLabel>
                     <TableData>
                        {getFirstDate() ? `${moment(getFirstDate()).diff(moment(getLastDate()), "months")}` : "-"}
                     </TableData>
                  </tr>
                  <tr>
                     <TableLabel># dias</TableLabel>
                     <TableData>
                     {getFirstDate() ? `${moment(getFirstDate()).diff(moment(getLastDate()), "days")}` : "-"}
                     </TableData>
                  </tr>
                  <tr>
                     <TableLabel>Volatilidade IBOV a.d.</TableLabel>
                     <TableData>{props.datasetStockA.length ? `${(math.std(props.datasetStockA.map(elem=>elem.close))).toFixed(2)}%` : "-"}</TableData>
                  </tr>
                  <tr>
                     <TableLabel>Volatilidade IBOV a.a.</TableLabel>
                     <TableData>{props.datasetStockA.length ? `${(100*math.std(props.datasetStockA.map(elem=>elem.close))/math.sqrt(252)).toFixed(2)}%` : "-"}</TableData>
                  </tr>
                  <tr>
                     <TableLabel>Volatilidade PETR4 a.d. </TableLabel>
                     <TableData>{props.datasetStockB.length ? `${(math.std(props.datasetStockB.map(elem=>elem.close))).toFixed(2)}%` : "-"}</TableData>
                  </tr>
                  <tr>
                     <TableLabel>Volatilidade PETR4 a.a. </TableLabel>
                     <TableData>{props.datasetStockB.length ? `${(100*math.std(props.datasetStockB.map(elem=>elem.close))/math.sqrt(252)).toFixed(2)}%` : "-"}</TableData>
                  </tr>
                  {/* <tr>
                     <TableLabel>R²</TableLabel>
                     <TableData>0,7103</TableData>
                  </tr> */}
               </tbody>
            </table>
         </div>
      </section>
   );
};

export default BetaResult;
