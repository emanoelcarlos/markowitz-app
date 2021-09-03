import * as React from "react";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Typography } from "antd";
// import { Bubble } from "react-chartjs-2";

const { Title } = Typography;

function DispersionChart(props) {
   
   useEffect(() => {
      console.log("Use effect!");
      console.log(props.datasetStockA, props.datasetStockB);
   }, []);

   useEffect(() => {
      console.log("Use effect!");
      console.log(props.datasetStockA, props.datasetStockB);
      plotChart(props.datasetStockA, props.datasetStockB);
   }, [props]);

   const [dispersionResult, setDispersionResult] = useState([]);

   const plotChart = (datasetStockA, datasetStockB) => {
      
      let _dispersionResult = []
      if (datasetStockA.length <= datasetStockB.length) {
         for (let i = 0; i < datasetStockA.length; i++) {
            _dispersionResult.push({ x: datasetStockA[i].var, y: datasetStockB[i].var, r: 4});
         }
      }

      setDispersionResult(_dispersionResult);

      console.log(_dispersionResult);
   };

   return (
      <section style={{ marginTop: "4rem" }}>
         <Title>Gráfico de dispersão</Title>
         <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div>
               {
                  // <Bubble
                  //    data={{
                  //       datasets: [
                  //          {
                  //             label: "Dispersão",
                  //             data: dispersionResult,
                  //             backgroundColor: "lightblue",
                  //          },
                  //       ],
                  //    }}
                  // />
               }
            </div>
            <div>
               No gráfico acima temos o retorno diário da PETR4 no eixo Y e do IBOV no Eixo X. O período analisado
               reflete os últimos 3 anos. Clique aqui para mudar configurações avançadas.
            </div>
         </div>
      </section>
   );
}

//    var myBubbleChart = new Chart(ctx, {
//       type : 'bubble',
//       data : {
//           datasets : [
//               {
//                   label : 'Group 1: ' + main_arr[0].length,
//                   data : main_arr[0],
//                   backgroundColor : 'lightblue'
//               }, {
//                   label : 'Group 2: ' + main_arr[1].length,
//                   data : main_arr[1],
//                   backgroundColor : 'pink'
//               }
//           ],
//       },
//       options : {
//           scales : {
//               yAxes : [{
//                       ticks : {
//                           beginAtZero : true,
//                           min : 0,
//                           max : 100
//                       }
//                   }
//               ],
//               xAxes : [{
//                       ticks : {
//                           beginAtZero : true,
//                           min : 0,
//                           max : 10
//                       }
//                   }
//               ],
//           }
//       }
//   });
export default DispersionChart;
