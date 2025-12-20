import { db } from "../database/db.js";

export const refreshTokenRepo = {
  async create({ id, userId, token, expiresAt, ip, userAgent }) {
    await db.run(
      `INSERT INTO refresh_tokens 
       (id, user_id, token, expires_at, ip, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, userId, token, expiresAt, ip, userAgent]
    );
  },

  async findByToken(token) {
    return db.get(
      `SELECT * FROM refresh_tokens WHERE token = ? AND revoked = 0`,
      [token]
    );
  },


  async revoke(id) {
    await db.run(
      `UPDATE refresh_tokens SET revoked = 1 WHERE id = ?`,
      [id]
    );
  }
};