import { db } from "../database/db.js";


export const userRepo = {
  async create(username, password_hashed, role){
    await db.run(
      `INSERT INTO users 
       (username, password_hash, user_role)
       VALUES (?, ?, ?)`,
      [username, password_hashed, role]
    );
  },

  async findbyUser(username){
    return db.get(
      `SELECT * FROM users WHERE username = ?`, [username]
    );
  },
}