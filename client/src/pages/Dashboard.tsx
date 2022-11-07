import React, { useState } from 'react';
import InsightCard from "../components/Insights/InsightCard";
import statusCards from "../assets/data/statusCard.json";
import BarChart from "../components/Chart/BarChart";
import AreaChart from "../components/Chart/AreaChart";
import PieChart from "../components/Chart/PieChart";
import RadialChart from "../components/Chart/RadialBar";
import {Navigate} from 'react-router-dom';
import {DateRangePicker} from "rsuite";
import "rsuite/dist/rsuite.min.css";

import "./_dashboard.scss";

const Dashboard = () => {
  //onChange function for calendar
  // console.log("Change function triggered");
  const [startDate, setStartDate] = useState(['2022-01-01T06:37:32.378Z']);
  const [endDate, setEndDate] = useState(['2022-01-10T06:37:32.378Z']);
  const [callAPI, setCallAPI] = useState<boolean | undefined>();

  const handleDate = async(value:any) => {
    setStartDate(value[0]);
    setEndDate(value[1]);
    setCallAPI(true);
    console.log(startDate, endDate);
  }

  const isLoggedIn:boolean = true;
  if(!isLoggedIn){
     return <Navigate to="/login"/>
  }
    return (
        <div className="dashboard">
          <div className="dashboard__container">
          <div style={{marginLeft: "auto", marginRight: "0"}}>
          <DateRangePicker
            onChange = {handleDate}
            />
          </div>
            <div className="dashboard__container__row1">
              <div className="dashboard__container__row1__left">
                <div className="dashboard__container__row1__left__status__card" style= {{width: "400px", padding: "20px"}}>
                  {statusCards.map((item, index) => (
                    <div className="dashboard__container__row1__left__status__card__data">
                      {/*statuscard data*/}
    
                      <InsightCard
                        title={item.title}
                        count={item.count}
                        icon={item.icon}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="dashboard__container__row1__right">
                    {/* <PieChart 
                    startDate = {startDate}
                    endDate = {endDate}
                    callAPI = {callAPI}
                    /> */}
                      <PieChart
                      startDate = {startDate}
                      endDate = {endDate}
                      callAPI = {callAPI}
                      />
              </div>
            </div>{" "}
            <AreaChart/>
            <div className="dashboard__container__row1">
              <BarChart/>    
              <RadialChart/>
            </div>
          </div>{" "}
        </div>
      );
};

export default Dashboard;