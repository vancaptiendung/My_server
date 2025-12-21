import jwt from "jsonwebtoken";
import {AppError} from "../errors/AppError.js"
import brypt from "bcrypt";
import {refreshTokenRepo} from "../repositories/refreshToken.repo.js"
import { userRepo } from "../repositories/user.repo.js";
import crypto from "node:crypto";

function generation_refresh_token(){
    return crypto.randomBytes(64).toString("hex");
}

async function addnewrefreshToken(user_id, time, ip, user_agent){
    const id = crypto.randomUUID();
    const token = generation_refresh_token();
    const expires = new Date(Date.now() + time);
    refreshTokenRepo.create({id, user_id, token, expires, ip, user_agent });
    return token;
};

export async function login_check(username, password, user_agent, ip){
    const user = await userRepo.findbyUser(username);

    if (user === undefined) throw new AppError("username not found", 401);

    const ok = await brypt.compare(password, user.password_hash);
    if (!ok) throw new AppError("Wrong password!", 401);

    const accessToken = jwt.sign(
        {"userid" : user.id, "role" : user.role},
        process.env.JWT_SECRET,
        {expiresIn: "15m"}
    );

    const timeExpires = 15*24*60*60*1000;
    // console.log(user.id);
    const refresh_token = await addnewrefreshToken(user.id, timeExpires, ip, user_agent);
    const tokenHash = crypto.createHash("sha256").update(refresh_token).digest("hex");
    
    return {accessToken, tokenHash};
}