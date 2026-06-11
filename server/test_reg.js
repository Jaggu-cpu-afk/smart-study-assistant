const http = require('http');

const data = JSON.stringify({
  name: "jaggu",
  email: "jagapathinaidu071206@gmail.com",
  password: "1234"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
