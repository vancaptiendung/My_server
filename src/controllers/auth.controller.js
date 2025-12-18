import { validinput } from "../utils/validator.js";
import express from "express";
import {login_check} from "../services/auth.service.js"

export async function showkey(req, res){
    res.send("YGUY{he1l0_Em_Y3u}");
};

export async function login(req, res, next){
    try{
        // console.log("next type:", typeof next);
        const {username, password} = req.body;
        await validinput(username, password);
        const token = await login_check({username, password});
        res.json({token : token});
    }catch (err){
        next(err);
    } 
}

export async function profile(req, res, next){
    res.json({username : req.user});
}