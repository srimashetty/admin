import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/posts";

const getAllPublicPosts = () => {
  return axios.get(API_URL + "/public");
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL + "/private", { headers: authHeader() });
};

const getAllDetails = () => {
  return axios.get("http://localhost:5000/api/v1/data/details", {headers: authHeader() });
}

const getPieChart = () => {
  return axios.get("http://localhost:5000/api/v1/charts/piechart", {headers: authHeader() });
}

const postPieChart:any = (startDate:any, endDate:any) => {
  try {
    return axios
    .post("http://localhost:5000/api/v1/charts/defaultPiechart", JSON.stringify({
      startDate,
      endDate,
    }), {
     headers:{
  'Content-Type': 'application/json; charset=UTF-8'
  }})
    .then((response) => { 
      return response.data;
    });
   } catch (err) {
     if(err instanceof Error){
       console.log(err.message);
     } else{
       console.log('Unexpected error', err);
     }
   }
}
const getBarChart = () => {
  return axios.get("http://localhost:5000/api/v1/charts/barchart", {headers: authHeader()});
}

const getAreaChart = () => {
  return axios.get("http://localhost:5000/api/v1/charts/areachart", {headers: authHeader()});
}

const getRadialChart = () => {
  return axios.get("http://localhost:5000/api/v1/charts/radialchart", {headers: authHeader()});
}

const getDownload = () => {
  return axios.get("http://localhost:5000/api/v1/data/download", {headers: authHeader()});
}

const postRange:any = (startDate:any, endDate:any) => {
  try {
   return axios
   .post("http://localhost:5000/api/v1/data/range", JSON.stringify({
     startDate,
     endDate,
   }), {
    headers:{
 'Content-Type': 'application/json; charset=UTF-8'
 }})
   .then((response) => { 
     return response.data;
   });
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message);
    } else{
      console.log('Unexpected error', err);
    }
  }
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
  getAllDetails,
  getPieChart,
  postPieChart,
  getBarChart, 
  getAreaChart,
  getRadialChart,
  getDownload,
  postRange
};

export default postService;