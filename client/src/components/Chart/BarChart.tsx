import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
// import { useNavigate } from "react-router-dom";
import ReactApexChart from 'react-apexcharts';
import "./style.scss";

const BarChart = () => {
  const [count, setCount] = useState<number[]>([]);
  const [reason, setReason] = useState<string[]>([]);

//   const navigate = useNavigate();

useEffect(() => {
    const countData:number[] = [];
    const reasons:string[] = [];
    PostService.getRadialChart().then(({ data })=> {
          const resData = data;
        //   console.log(resData[0].completed);
          for(let i=0; i< resData.length; i++)
          {
                countData.push(parseInt(resData[i].count));
                reasons.push(resData[i].completed);
                console.log(resData[i].completed);
                console.log(reasons[i]);
                // console.log(reason[i]);
          }
        //   console.log(reasons);
          setCount(countData);
          setReason(reasons);
      })
      .catch((err)=> {
            // AuthService.logout();
            // navigate("/login");
            // window.location.reload();
            console.log(err);
      })
  }, []);

  return (
    <React.Fragment>
    <div className="container-fluid mb-5 chartBox" style = {{marginLeft: "2%"}}>
      <h3 className="text-center mt-3 mb-3">KYC Failure Reasons</h3>
    
      <ReactApexChart
        type="bar"
        height={370}
        series={[
          {
            name: "Not match reason",
            data: count,
          },
        ]}
        options={{
          xaxis: {
            tickPlacement: "on",
            categories: reason,
          },

          yaxis: {
              labels: {
                formatter: (val) => {
                return `${val}`;
                },
            },
               title: {
               text: "Users",
            },
          },

          legend: {
            show: true,
            position: "right",
          },

          dataLabels: {
            formatter: (val) => {
              return `${val}`;
            },
          },
        }}
      ></ReactApexChart>
    </div>
  </React.Fragment>
  );
};

export default BarChart;