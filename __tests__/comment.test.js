const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const { response, post } = require('../lib/app');

jest.mock('../lib/middleware/ensureAuth.js', () => (req, res, next) => {
  req.user = {
    userName: 'test_user',
    photoUrl: 'https://placekitten.com/',
  };
  next();
});

describe('latergram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  let testPost;
  let testUser;
  let testComment;
  beforeEach(async () => {
    testUser = await User.insert({
      userName: 'test_user',
      photoUrl: 'https://placekitten.com/',
    });

    testPost = await Post.insert({
      imageUrl: 'https://placekitten.com/',
      caption: '#latergram',
      tags: '#yolo, #livelyfe, #nofilter',
      userName: 'test_user',
    });

    testComment = await Comment.insert({
      commentBy: testUser.userName,
      post: testPost.id,
      comment: 'looking good'
    });
  });

  afterAll(() => pool.end());

  const newComment = {
    commentBy: 'test_user',
    post: '1',
    comment: 'looking great'
  }


  it('create new comment via POST', async () => {
    const { body } = await request(app)
    .post('/api/v1/comments')
    .send(newComment);

    expect(body).toEqual({
      commentBy: testUser.userName,
      post: testPost.id,
      comment: 'looking great',
      id: '2'
    });
  });

});