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

  static async getById(id) {
    const { rows } = await pool.query(`SELECT * FROM posts WHERE id=$1`, [id]);
    if (!rows[0]) throw new Error(`No post with id ${id} found!`);
    return new Post(rows[0]);
  }

  static async update(id, { caption, userName }) {
    const {
      rows,
    } = await pool.query(
      `UPDATE posts SET caption=$1 WHERE id=$2 AND user_name=$3 RETURNING *`,
      [caption, id, userName]
    );
    if (!rows[0])
      throw new Error(
        `No post with id ${id} found made by username: ${userName}!`
      );
    return new Post(rows[0]);
  }
};
