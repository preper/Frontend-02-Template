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
body div #myid{
  width: 100px
}
  </style>
</head>
<body>
  <div>
    <img id="myid"/>
    <img />
    <p>Hello World</p>
  </div>
</body>
</html>`)
  })
}).listen(8088)

console.log('server started')
