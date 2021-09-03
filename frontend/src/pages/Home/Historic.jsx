import * as React from "react";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Typography } from "antd";

const { Title } = Typography;

const ResultTableHeader = styled.div`
   border-top: 1px solid black;
   border-bottom: 1px solid black;
   padding: 2px;
`;

const ResultTableData = styled.td`
   line-height: 1.8rem;
   text-align: center;
`;

const PositiveVariationMark = styled.div`
   padding: 2px 8px;
   background-color: #d8f9ef;
   display: inline;
`;

const NegativeVariationMark = styled.div`
   padding: 2px 8px;
   background-color: #ffe2e1;
   display: inline;
`;

function Historic(props) {

   useEffect(() => {
      if (props.datasetStockA.length && props.datasetStockB.length) setPlotTable(true);
   }, [props]);

   const [plotTable, setPlotTable] = useState(false);

   return (
      <section style={{ marginTop: "4rem" }}>
         <Title>Histórico utilizado</Title>
         <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            {/* <table style={{ width: "600px" }}> */}
            <table style={{ borderSpacing: 10 }}>
               <thead>
                  <tr
                     style={{
                        fontWeight: 500,
                        fontSize: "1.2rem",
                        textAlign: "left",
                        color: "#000000",
                     }}
                  >
                     <th></th>
                     <th colSpan={4} style={{ paddingLeft: "12px" }}>
                        IBOV
                     </th>
                     <th colSpan={4} style={{ paddingLeft: "12px" }}>
                        PETR4
                     </th>
                  </tr>

                  <tr
                     style={{
                        fontSize: "1.1rem",
                        textAlign: "center",
                        color: "#000000",
                     }}
                  >
                     <th>
                        <ResultTableHeader>Data</ResultTableHeader>
                     </th>

                     <th style={{ paddingLeft: "12px" }}>
                        <ResultTableHeader>Último</ResultTableHeader>
                     </th>
                     <th>
                        <ResultTableHeader>Máxima</ResultTableHeader>
                     </th>
                     <th>
                        <ResultTableHeader>Mínima</ResultTableHeader>
                     </th>
                     <th>
                        <ResultTableHeader>Variação %</ResultTableHeader>
                     </th>

                     <th style={{ paddingLeft: "12px" }}>
                        <ResultTableHeader>Último</ResultTableHeader>
                     </th>
                     <th>
                        <ResultTableHeader>Máxima</ResultTableHeader>
                     </th>
                     <th>
                        <ResultTableHeader>Mínima</ResultTableHeader>
                     </th>
                     <th>
                        <ResultTableHeader>Variação %</ResultTableHeader>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {plotTable &&
                     props.datasetStockA.map((elem, i) => {
                        // console.log("map -----------");
                        // console.log(props);
                        // console.log(props.datasetStockA[i], props.datasetStockB[i]);

                        return (
                           <tr key={i}>
                              <ResultTableData>{elem.date}</ResultTableData>

                              <ResultTableData style={{ paddingLeft: "12px" }}>
                                 {parseFloat(props.datasetStockA[i].close).toFixed(2)}
                              </ResultTableData>
                              <ResultTableData>{parseFloat(props.datasetStockA[i].high).toFixed(2)}</ResultTableData>
                              <ResultTableData>{parseFloat(props.datasetStockA[i].low).toFixed(2)}</ResultTableData>
                              <ResultTableData>
                                 {parseFloat(props.datasetStockA[i].var) > 0 ? (
                                    <PositiveVariationMark> {parseFloat(props.datasetStockA[i].var).toFixed(2)}% </PositiveVariationMark>
                                 ) : (
                                    <NegativeVariationMark> {parseFloat(props.datasetStockA[i].var).toFixed(2)}% </NegativeVariationMark>
                                 )}
                              </ResultTableData>

                              <ResultTableData style={{ paddingLeft: "12px" }}>
                                 {props.datasetStockB[i] ? parseFloat(props.datasetStockB[i].close).toFixed(2) : "-"}
                              </ResultTableData>
                              <ResultTableData>
                                 {props.datasetStockB[i] ? parseFloat(props.datasetStockB[i].high).toFixed(2) : "-"}
                              </ResultTableData>
                              <ResultTableData>
                                 {props.datasetStockB[i] ? parseFloat(props.datasetStockB[i].low).toFixed(2) : "-"}
                              </ResultTableData>
                              <ResultTableData>
                                 {props.datasetStockB[i] && parseFloat(props.datasetStockB[i].var) > 0 ? (
                                    <PositiveVariationMark> {parseFloat(props.datasetStockB[i].var).toFixed(2)}% </PositiveVariationMark>
                                 ) : (
                                    <NegativeVariationMark> {parseFloat(props.datasetStockB[i].var).toFixed(2)}% </NegativeVariationMark>
                                 )}
                              </ResultTableData>
                           </tr>
                        );
                     })}
               </tbody>
            </table>
         </div>
      </section>
   );
}

export default Historic;
