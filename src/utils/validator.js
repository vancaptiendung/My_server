export function validinput(username, password){
    if (typeof(username) != "string" || typeof(password) != "string") throw new Error("invalid input");
    if (username.trim() === "") throw new Error("Blank username");

    if (password.length < 8) throw new Error("Short password !");
}