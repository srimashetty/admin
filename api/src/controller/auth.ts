import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import pool from "../../config/db";

const signup = async(req: any, res: any) => {
    const body = req.body;
    const name = req.body.fullName;
    console.log(name);
    const email = req.body.email;
    const password = req.body.password;

    //check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1',
    [email]
    );

    //if exists return status 200 with error message
    if(existingUser.rowCount != 0){
        return res.status(200).json({
            error: [
                {
                    email: email,
                    msg: "The user already exists",
                },
            ],
        });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password:", hashedPassword);
   
    //save email and password to database
    const newUser = await pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', 
    [email, hashedPassword, name]);
    console.log(newUser.command);
    
    //generate token and send response
    const accessToken = await JWT.sign(
        { email },
        'SECRET',
        {
            expiresIn: "1h",
        }
    );
    if(newUser.command == 'INSERT'){
        res.json({
            accessToken,
            });
        console.log("Access Token:",accessToken);
    }
}

const userData = async(req: any, res: any) => {
    const getUsers = await pool.query('SELECT * FROM users;');
    res.json(getUsers.rows);
}

let refreshTokens: Array<string> = [];

const login = async(req: any, res: any) => {
    const { email, password } = req.body;
  
    // Look for user email in the database
    const loginUser = await pool.query('SELECT * FROM users WHERE email = $1',
        [email]
    );
  
    // If user not found, send error message
    if (loginUser.rowCount == 0) {
      return res.status(400).json({
        error: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }
    
    const userPassword = loginUser.rows[0].password;
    // Compare hased password with user password to see if they are valid
    let isMatch = await bcrypt.compare(password, userPassword);
  
    if (!isMatch) {
      return res.status(401).json({
        error: [
          {
            msg: "Email or password is invalid",
          },
        ],
      });
    }
  
    // Send JWT access token
    const accessToken = await JWT.sign(
      { email },
      'SECRET',
      {
        expiresIn: "1h",
      }
    );
  
    // Refresh token
    var refreshToken:string;
     refreshToken = await JWT.sign(
      { email },
      'SECRET',
      {
        expiresIn: "1h",
      }
    );
  
    // Set refersh token in refreshTokens array
    refreshTokens.push(refreshToken as string);
  
    res.json({
      accessToken,
      refreshToken,
    });
} 

// export async function token(req: Request, res: Response) {
//     const refreshToken = req.header("x-auth-token");
  
//     // If token is not provided, send error message
//     if (!refreshToken) {
//       res.status(401).json({
//         error: [
//           {
//             msg: "Token not found",
//           },
//         ],
//       });
//     }

//     // If token does not exist, send error message
//     if (!refreshTokens.includes(refreshToken as string)) {
//         res.status(403).json({
//             error: [
//             {
//                 msg: "Invalid refresh token",
//             },
//             ],
//         });
//     }

//     try {
//         const user = await JWT.verify(
//           refreshToken as string,
//           'SECRET'
//         );
//         // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
//         const email = user.email;
//         const accessToken = await JWT.sign(
//           { email },
//           'SECRET',
//           { expiresIn: "1h" }
//         );
//         res.json({ accessToken });
//       } catch (error) {
//         res.status(403).json({
//           error: [
//             {
//               msg: "Invalid token",
//             },
//           ],
//         });
//     }
// }

const logout = async(req: any, res: any) => {
    const refreshToken = req.header("x-auth-token");
  
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
}

export {signup, userData, login, logout}

