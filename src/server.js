import "./routes/auth.route.js";
import {app} from "./app.js";

app.listen(3000, () => {
    console.log("server start at: http://localhost:3000");
});