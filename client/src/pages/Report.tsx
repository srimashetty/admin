import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import {Navigate} from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid"
import CsvIcon from '../assets/download_png.png';
import {CSVLink} from "react-csv";
import {DateRangePicker} from "rsuite";
import "rsuite/dist/rsuite.min.css";


//columns definition
const columns = [
    {field: 'log_uuid', headerName: 'UUID' },
    {field: 'source', headerName: 'Source', width: 130},
    {field: 'kyc_avlb', headerName: 'KYC Available', width: 160},
    {field: 'f_score', headerName: 'Face Score', width: 155},
    {field: 'f_match', headerName: 'Result', width: 155},
    {field: 'date_of_application', headerName: 'Application Date', width: 220},
    {field: 'completed_on', headerName: 'Completed On', width: 220},
  ]

const Report = () => {

  const currentDate = '2022-01-07';
  const fileName = 'click_check ' + currentDate + '.csv';
  const [tableData, setTableData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);

  //onChange function for calendar
  const handleDate = async(value:any) => {
    const startDate = value[0];
    const endDate = value[1];
    console.log(startDate, endDate);
    await PostService.postRange(startDate, endDate).then(( data : any) => {
      console.log(data);
      setTableData(data);
    })
  }

  useEffect(() => {

    //fetching default display data
    const fetchDetails = async() => {
      await PostService.getAllDetails().then(({ data })=> {
        setTableData(data);
        console.log(tableData);
      })
      .catch((err)=> {
            console.log(err);
            window.location.reload();
            // console.log(err);
      })
    }

    //fetching default download data
    const defaultDownload = async() => {
      await PostService.getDownload().then(({data})=> {
        console.log(data);
        setDownloadData(data);
        console.log(downloadData);
      })
    }
    fetchDetails();
    defaultDownload();
  }, []);

  const user = AuthService.getCurrentUser();
  if(!user){
    return <Navigate to= "/login" />
  }else{
    return (
      <div style={{height: 700, width: '100%'}}>
        <div>
        <DateRangePicker
        onChange = {handleDate}
        />
        <CSVLink data={downloadData}>
          <img src={CsvIcon} style = {{width: "28px", height: "30px" }} />
        </CSVLink>
        </div>
        <DataGrid 
          style={{marginTop: "1.5%"}}
            rows={tableData}
            columns={columns}
            pageSize = {10}
            // rowsPerPage = {10}
        />
      </div>
    );
  }
};

export default Report;