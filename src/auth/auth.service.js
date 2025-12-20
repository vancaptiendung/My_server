import jwt from "jsonwebtoken";
import {AppError} from "../errors/AppError.js"
import brypt from "bcrypt";

const USERINFO = {
    "dung" : {
        user_id : crypto.randomUUID,
        password : brypt.hash("helloword123", 10),
    },
    "kiet" : {
        user_id : crypto.randomUUID,
        password : brypt.hash("kietblox123", 10),
    },
    "admin" : {
        user_id : crypto.randomUUID,
        password :  brypt.hash("hachimimambo", 10),
    }
}

RefreshTokens = [];

function generation_refresh_token(){
    return crypto.randomBytes(64).toString();
}

export async function login_check({username, password}, req){
    const user = USERINFO[username];

    if (user === undefined) throw new AppError("username not found", 401);

    const ok = await brypt.compare(password, user.password);
    if (!ok) throw new Error("Wrong password!", 401);

    const accesstoken = jwt.sign(
        {
            username : username,
            role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn : "15m"}
    );

    const datarefreshtoken = {
        user_id : user.user_id,
        token : generation_refresh_token(),
        token_id : crypto.randomUUID,
        ip : req.ip,
        user_agent : req.header["user_agent"]
    }

    const refreshtoken = jwt.sign(

    )
}