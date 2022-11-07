function authHeader(){
    try {
        const user:any = JSON.parse(localStorage.getItem("user") || "");

        if(user && user.accessToken){
            return {"x-auth-token": user.accessToken};
        }else{
            return {"x-auth-token": "invalidtoken"};
        }
        
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
          } else{
            console.log('Unexpected error', err);
          }
    }
}

export default authHeader;