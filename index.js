import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();

//checking jwt_password
if (!process.env.JWT_SECRET) {
    throw new Error("JWT Password not found !");
}

function authmiddleware(req, res, next){
    const auth = req.headers.authorization;

    if (!auth){return res.status(401).json({error : "missing token"});}
    if (auth.split(" ")[0] != "Bearer") return res.status(401).json({error : "invalid auth format"});

    const token = auth.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({error : "invalid token"});
    }

}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home");
});

app.get("/health", (req, res) => {
    res.json({status: "ok"});
});

app.get("/users/:name", (req, res) => {
    res.json({"user":req.params.name});
});

function validinput(username, password){
    if (typeof(username) != "string" || typeof(password) != "string") throw new Error("invalid input");
    if (username.trim() === "") throw new Error("Blank username");

    if (password.length < 8) throw new Error("Short password !");
}

app.post("/login", (req, res) => {
    try{
        const {username, password} = req.body;
        validinput(username, password);
        // console.log(username, password);
        if (username != "admin" || password != "123123123"){
            return res.status(401).json({error : "invalid username or password !"});
        }

        const token = jwt.sign(
            {username},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.json({token});

    } catch (err){
        res.status(400).json({error :err.message});
    } 
});

app.get("/me", authmiddleware, (req, res) => {
    res.json({
        user : req.user.username,
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server start at localhost: ${PORT}`);
});

// console.log(process.env.JWT_SECRET);