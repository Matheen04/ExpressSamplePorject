const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if(req.url == '/'){
    res.end('Home');
  } else if(req.url == '/about'){
    res.end('About');
  } else if (req.url == '/jsonData'){
      fs.readFile(`${__dirname}/apiData.json`, 'utf-8', (err, data) => {
      res.end(data);
    })
  } else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});