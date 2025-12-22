import "dotenv/config";
import {app} from "./app.js";
import "./repositories/refreshToken.repo.js"
import { userRepo } from "./repositories/user.repo.js";
import bcrypt from "bcrypt";
import { refreshTokenRepo } from "./repositories/refreshToken.repo.js";

// userinfoRepo.create("Dung", bcrypt.hash("Helloword123", 10), "user");
// const a = await bcrypt.hash("helloword123", 10);
// userRepo.create("Dung123", a, "user");
// const b = await bcrypt.hash("kietdeptrai", 10);
// userRepo.create("Kiet123", b, "user");
// const c = await bcrypt.hash("YGUY{s0_su3pr1sE_Y0u_F0und_1T}", 10);
// userRepo.create("admin", c, "admin");


app.listen(3000, () => {
    console.log("server start at: http://localhost:3000");
});


// test login 
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"123123123\"}"
// test jwt 
