import React, {useState, useEffect} from 'react';
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import ReactApexChart from "react-apexcharts";
import "./style.scss";

const AreaChart = () => {
    const [date, setDate] = useState<any>([]);
    const [count, setCount] = useState<any>([]);

    useEffect(() => {
        const dateData:string[] = [];
        const countData:number[] = [];

        PostService.getAreaChart().then(({ data }) => {
            const resData = data;
            for(let i=0; i< resData.length; i++)
            {
                  dateData.push(resData[i].date_of_application.slice(0,10));
                  countData.push(parseInt(resData[i].count));
            }
            setDate(dateData);
            setCount(countData);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid mb-3 mt-3 chartBox">    
                <h2>Application Analytics</h2>
                <ReactApexChart 
                    type="area"
                    // width={800}
                    height={400}
    
                    series={[
                            {   name:"Applications",
                                data: count
                            }
                    ]}
    
                    options={ {
    
                        stroke: {width:3, curve:'smooth'},
                        ///fill:{opacity:1, type:'solid'},
    
                    xaxis:{
                        title:{ text:"Date of Application",
                                },
                        categories:date
                        },
                    yaxis:{
                    title:{
                        text:"No of Applications",
                        }
                    }
                }}          
                >
                </ReactApexChart>
            </div>
        </React.Fragment>
    );    
};

export default AreaChart;