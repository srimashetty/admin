import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
// import { useNavigate } from "react-router-dom";
import ReactApexChart from 'react-apexcharts';
import "./style.scss";

const RadialBar = () => {
  const [count, setCount] = useState<number[]>([]);
  const [perc, setPerc] = useState<number[]>([]);

//   const navigate = useNavigate();

  useEffect(() => {
    const calcPerc = (num:number, total:number) => {
      return (100 * num)/total;
    }

    const countData:number[] = [];
    PostService.getBarChart().then(({ data })=> {
          const resData = data;
          for(let i=0; i< resData.length; i++)
          {
                countData.push(parseInt(resData[i].true));
                countData.push(parseInt(resData[i].false));
          }
          const total:number = countData[0] + countData[1];
          const percentage:number[] = [];
          percentage.push(calcPerc(countData[0], total));
          percentage.push(calcPerc(countData[1], total));
          setCount(countData);
          setPerc(percentage);
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
      <h3 className="text-center mt-3 mb-3">KYC Match</h3>
    
      <ReactApexChart 
                type="radialBar"
                height={370}

                series={ perc }                

                legend={{
                  show: true,
                  floating: true,
                  labels: {
                    useSeriesColors: true,
                  },
                  markers: {
                    size: 0
                  }
                }}

                options={
                  {
                        // title:{ text:" "
                        // } , 
                       noData:{text:"Empty Data"},                        
                      // colors:["#f90000","#f0f"],
                      labels: ['Match', 'Not Match']                     

                 }
                }
                 
                >
                </ReactApexChart>
    </div>
  </React.Fragment>
  );
};

export default RadialBar;