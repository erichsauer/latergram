const pool = require('../utils/pool');

module.exports = class Comment {
  id;
  commentBy;
  post;
  comment;

  constructor(row) {
    this.id = row.id;
    this.commentBy = row.comment_by;
    this.post = row.post;
    this.comment = row.comment;
  }

  static async insert({ commentBy, post, comment }) {
    const {
      rows
    } = await pool.query(
      `INSERT INTO comments (comment_by, post, comment) VALUES ($1, $2, $3) RETURNING *`,
      [commentBy, post, comment]
    );
    return new Comment(rows[0]);
  }
  
  static async delete(id, userName) {
    const {
      rows,
    } = await pool.query(
      `DELETE FROM comments WHERE id=$1 AND comment_by=$2 RETURNING *`,
      [id, userName]
    );
    if (!rows[0]) throw new Error(`No comment with id ${id} found to delete!`);
    return new Comment(rows[0]);
  }

}