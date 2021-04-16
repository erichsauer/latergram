const pool = require('../utils/pool');

module.exports = class User {
  userName;
  photoUrl;

  constructor(row) {
    this.userName = row.github_user_name;
    this.photoUrl = row.github_photo_url;
  }

  static async insert({ userName, photoUrl }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO users (github_user_name, github_photo_url) VALUES ($1, $2) RETURNING *`,
      [userName, photoUrl]
    );
    return new User(rows[0]);
  }

  static async findByUserName({ userName }) {
    const {
      rows,
    } = await pool.query(`SELECT * FROM users WHERE github_user_name=$1`, [
      userName,
    ]);
    if (rows.length < 1) return null;
    return new User(rows[0]);
  }

  static async findUserNameWithPost(userName) {
    const { rows } = await pool.query(
      `
      SELECT 
        user_name,
        json_agg(id) as posts
      FROM
        users
      INNER JOIN posts
      ON users.github_user_name = posts.user_name
      WHERE user_name=$1
      GROUP BY user_name`,
      [userName]
    );
    return rows[0];
  }
};
