const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');

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
  });

  afterAll(() => pool.end());

  const newPost = {
    imageUrl: 'https://placekitten.com/',
    caption: '#latergram',
    tags: '#yolo, #livelyfe, #nofilter',
  };

  it('create new post via POST', async () => {
    const { body } = await request(app).post('/api/v1/posts').send(newPost);
    expect(body).toEqual({
      ...newPost,
      id: '2',
      userName: 'test_user',
    });
  });

  it('gets all posts', async () => {
    const { body } = await request(app).get('/api/v1/posts');
    expect(body).toEqual([
      {
        ...newPost,
        id: '1',
        userName: 'test_user',
      },
    ]);
  });
});
