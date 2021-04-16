const pool = require('../utils/pool');

module.exports = class Post {
  id;
  imageUrl;
  userName;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.imageUrl = row.image_url;
    this.userName = row.user_name;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ imageUrl, userName, caption, tags }) {
    const {
      rows,
    } = await pool.query(
      `INSERT INTO posts (image_url, user_name, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *`,
      [imageUrl, userName, caption, tags]
    );
    return new Post(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(`SELECT * FROM posts`);
    return rows.map((row) => new Post(row));
  }
};
