import React, { useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import AuthService from "../../services/auth.service";
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setfullName] = useState("");
    const [rePassword, setrePassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSignup = async (e:any) => {
      e.preventDefault();
      try {
        await AuthService.signup(fullName, email, password, rePassword).then(
          (response:any) => {
            // check for token and user already exists with 200
            //   console.log("Sign up successfully", response);
            navigate("/");
            window.location.reload();
          },
          (error:any) => {
            console.error(error.message);
          }
        );
      } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }else {
            console.log("Unexpected error", err);
        }
      }
    };
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

    <form onSubmit={handleSignup}>

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6' style={{paddingTop: "4%"}}>

          <MDBInput 
          value = {fullName}
          wrapperClass='mb-4' 
          placeholder='Your name' 
          id='formControlLg' 
          type='text' 
          size="lg"
          onChange = {(e:any) => setfullName(e.target.value)}
          />

          <MDBInput
          value = {email} 
          wrapperClass='mb-4' 
          placeholder='Email address' 
          id='formControlLg' 
          type='email' 
          size="lg"
          onChange = {(e:any) => setEmail(e.target.value)}
          />

          <MDBInput 
          value = {password}
          wrapperClass='mb-4' 
          placeholder='Password' 
          id='formControlLg' 
          type='password' 
          size="lg"
          onChange = {(e:any) => setPassword(e.target.value)}
          />

          <MDBInput
          value = {rePassword} 
          wrapperClass='mb-4' 
          placeholder='Re-Enter Password' 
          id='formControlLg' 
          type='password' 
          size="lg"
          onChange = {(e:any) => setrePassword(e.target.value)}
          />

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn size='lg'>
                <button type="submit">
                    Register
                </button>
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to="/login">Login</Link></p>
          </div>

        </MDBCol>

      </MDBRow>
      </form>

    </MDBContainer>
  );
}

export default Register;