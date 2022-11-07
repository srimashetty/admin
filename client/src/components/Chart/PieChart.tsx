import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
// import { useNavigate } from "react-router-dom";
import ReactApexChart from 'react-apexcharts';
import "./style.scss";

const PieChart = ({startDate, endDate, callAPI}: {startDate:any, endDate:any, callAPI:boolean | undefined}) => {
  const [source, setSource] = useState<string[]>([]);
  const [count, setCount] = useState<number[]>([]);

//   const navigate = useNavigate();
const sourceData:string[] = [];
const countData:number[] = [];
console.log(startDate, endDate);

//   useEffect(() => {
    // const defaultPieChart = async() => {
    // PostService.getPieChart().then(({ data })=> {
    //       const resData = data;
    //       for(let i=0; i< resData.length; i++)
    //       {
    //             if(resData[i].source === null)
    //                 sourceData.push('Null');
    //             else
    //                 sourceData.push(resData[i].source);
    //             countData.push(parseInt(resData[i].count));
    //       }
    //       setSource(sourceData);
    //       setCount(countData);
    const rangePieChart = async() => {
    await PostService.postPieChart(startDate, endDate).then((data:any) => {
        console.log(data);
        const resData = data;
        for(let i=0; i< resData.length; i++)
        {
              if(resData[i].source === null)
                  sourceData.push('Null');
              else
                  sourceData.push(resData[i].source);
              countData.push(parseInt(resData[i].count));
        }
        setSource(sourceData);
        setCount(countData);
    })
      .catch((err:any)=> {
            // AuthService.logout();
            // navigate("/login");
            // window.location.reload();
            console.log(err);
      })
    }
    rangePieChart();
//   }, []);
//   const rangePieChart = async() => {
//     await PostService.postPieChart(startDate, endDate).then((data:any) => {
//         console.log(data);
//         const resData = data;
//         for(let i=0; i< resData.length; i++)
//         {
//               if(resData[i].source === null)
//                   sourceData.push('Null');
//               else
//                   sourceData.push(resData[i].source);
//               countData.push(parseInt(resData[i].count));
//         }
//         setSource(sourceData);
//         setCount(countData);
//     })
//   }

//   if(startDate.length != 0 && callAPI == true){
//     rangePieChart();
//     callAPI = false;
//   }

  return (
        <React.Fragment>
            <div className="container-fluid mb-3 chartBox">
                <h3 className="mt-3"> Piechart </h3>
                <ReactApexChart 
                type="donut"
                width={500}
                height={500}

                series={ count }                

                options={{
                        title:{ text:" "
                        } , 
                       noData:{text:"Empty Data"},                        
                      // colors:["#f90000","#f0f"],
                      labels: source                     

                 }}
                 
                >
                </ReactApexChart>
            </div>
        </React.Fragment>
  );
};

export default PieChart;