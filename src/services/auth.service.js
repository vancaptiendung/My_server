import jwt from "jsonwebtoken";
import "dotenv/config";
import {AppError} from "../errors/AppError.js"

export async function login_check({username, password}){
    if (username != "admin" || password != "123123123"){
        throw new AppError("invalid username or password", 401);
    }
    const token = jwt.sign(
        {username},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    return token;
}