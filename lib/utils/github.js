const fetch = require('node-fetch');

const codeForToken = async (code) => {
  const res = await fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: json.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  return res.json().access_token;
};

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
