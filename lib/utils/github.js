const fetch = require('node-fetch');

const fetchCodeForToken = async (code) => {

  const res = await fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const booger = await res.json();
  return booger.access_token;
};

const getUserProfile = async (token) => {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    }
  })
  
  const { login, avatar_url } = await res.json();
  return { 
    userName: login,
    photoUrl: avatar_url
  }
}

module.exports = {
  fetchCodeForToken,
  getUserProfile
}

// const request = require('express');

// const {access_token} = await request.post(
//   'https://github.com/login/oauth/access_token',
//   (req, res, next) => {
//     try {
//       req
//         .set({
//           accept: 'application/json',
//           'content-type': 'application/json',
//         })
//         .send({
//           client_id: process.env.GITHUB_CLIENT_ID,
//           client_secret: process.env.GITHUB_CLIENT_SECRET,
//           code,
//         });
//     } catch (e) {
//       next(e);
//     }
//   }
// );
// return access_token
