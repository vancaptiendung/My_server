import "dotenv/config";
import {app} from "./app.js";

app.listen(3000, () => {
    console.log("server start at: http://localhost:3000");
});


// test login 
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"123123123\"}"
// test jwt 
