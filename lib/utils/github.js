const fetch = require('node-fetch');

const codeForToken = async (code) => {
  const res = fetch(`https://github.com/login/oauth/access_token`, {
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
