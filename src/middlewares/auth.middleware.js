import "dotenv/config";
import jwt from "jsonwebtoken";

export function authmiddleware(req, res, next){
    const auth = req.headers.authorization;

    if (!auth){return res.status(401).json({error : "missing token"});}
    if (auth.split(" ")[0] != "Bearer") return res.status(401).json({error : "invalid auth format"});

    const token = auth.split(" ")[1];

    try{
        // console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.name, err.message);
        res.status(401).json({ error: err.message });
    }
}