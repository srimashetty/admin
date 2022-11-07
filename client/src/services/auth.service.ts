import axios from "axios";

const API_URL:string = "/auth";

const signup:any = (fullName:string, email:string, password:string, rePassword:string) => {
    try {
      return axios
      .post("http://localhost:5000/api/v1/auth/signup", JSON.stringify({
        fullName,
        email,
        password,
        rePassword
      }), {
        headers:{
     'Content-Type': 'application/json; charset=UTF-8'
     }})
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
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

const login:any = (email:string, password:string) => {
    try {
     return axios
     .post("http://localhost:5000/api/v1/auth/login", JSON.stringify({
       email,
       password,
     }),{
       headers:{
    'Content-Type': 'application/json; charset=UTF-8'
    }})
     .then((response) => {
       if (response.data.accessToken) {
         localStorage.setItem("user", JSON.stringify(response.data));
       }
   
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

const logout = () => {
    // return JSON.parse(localStorage.getItem("user") || "");
    localStorage.removeItem("user");
};

const getCurrentUser= () => {
    try{
      return JSON.parse(localStorage.getItem("user") || "");
    }catch(err){
      if(err instanceof Error){
        console.log(err);
      }else{
        console.log("Unexpected error", err);
      }
    }
}

const authService = {
    signup, 
    login,
    logout,
    getCurrentUser,
};

export default authService;