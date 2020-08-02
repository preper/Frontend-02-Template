const http = require('http')

http.createServer((req, res) => {
  let body = []
  req.on('error', err => {
    console.error(err)
  }).on('data', chunk => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log('body:', body)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(
`<html maaa=a >
<head>
  <title>hello</title>
  <style>
.main {
  width:500px;
  height:300px;
  display:flex;
  background-color:rgb(255,255,255)
}
body div #myid{
  width: 100px;
  height: 100px;
  background-color:rgb(255,80,255);
}
body div img{
  width: 30px;
  height: 100px;
  background-color: rgb(255,17,17);
}
body div .a{
  flex: 2;
  height: 50px;
  color: #f00;
  background-color: rgb(0,255,0);
}
body div .b{
  flex: 1;
  color: #0f0;
  background-color: rgb(255,255,0);
}
body div .a.b{
  flex: 3;
  color: #00f;
  background-color: rgb(255,0,0);
}
  </style>
</head>
<body>
  <div class="main">
    <img id="myid"/>
    <img />
    <p class="a">Hello World a</p>
    <p class="b">Hello World b</p>
    <p class="a b">Hello World ab</p>
  </div>
</body>
</html>`)
  })
}).listen(8088)

console.log('server started')
