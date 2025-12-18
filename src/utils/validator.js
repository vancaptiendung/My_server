import { AppError } from "../errors/AppError";

export function validinput(username, password){
    if (typeof(username) != "string" || typeof(password) != "string") throw AppError("invalid input", 400);
    if (username.trim() === "") throw AppError("Blank username", 400);

    if (password.length < 8) throw AppError("Short password !", 400);
}