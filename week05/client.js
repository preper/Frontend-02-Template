const net = require('net')
const images = require('images')
const parser = require('./parser.js')
const render = require('./render.js')

class Request {
  constructor (options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json')
      this.bodyText = JSON.stringify(this.body)
    else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded')
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')

    this.headers['Content-Length'] = this.bodyText.length
  }

  send (connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser;
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }
      connection.on('data', data => {
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
          connection.end()
        }
      })
      connection.on('error', err => {
        reject(err)
        connection.end()
      })
    })
  }

  toString () {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }
}

class ResponseParser {
  constructor () {
    this.current = this.addStatusLine
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = null
  }
  get isFinished () {
    return this.bodyParser && this.bodyParser.isFinished
  }
  get response () {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  addStatusLine (char) {
    if (char === '\r') {
      this.current = this.waitStatusLineEnd
    } else {
      this.statusLine += char
    }
  }
  waitStatusLineEnd (char) {
    if (char === '\n') {
      this.current = this.addHeaderName
    }
  }
  addHeaderName (char) {
    if (char === ':') {
      this.current = this.waitHeaderSpace
    } else if (char === '\r') {
      this.current = this.waitHeaderBlockEnd
      if (this.headers['Transfer-Encoding'] === 'chunked') {
        this.bodyParser = new TrunkedBodyParser()
      }
    } else {
      this.headerName += char
    }
  }
  waitHeaderSpace (char) {
    if (char === ' ') {
      this.current = this.addHeaderValue
    }
  }
  addHeaderValue (char) {
    if (char === '\r') {
      this.current = this.waitHeaderLineEnd
      this.headers[this.headerName] = this.headerValue
      this.headerName = ''
      this.headerValue = ''
    } else {
      this.headerValue += char
    }
  }
  waitHeaderLineEnd (char) {
    if (char === '\n') {
      this.current = this.addHeaderName
    }
  }
  waitHeaderBlockEnd (char) {
    if (char === '\n') {
      this.current = this.setBody
    }
  }
  setBody (char) {
    this.bodyParser.receiveChar(char)
  }

  receive (str) {
    for (let i = 0; i < str.length; i++) {
      this.current(str.charAt(i))
    }
  }
}

class TrunkedBodyParser {
  constructor () {
    this.length = 0
    this.content = []
    this.isFinished = false
    this.current = this.setLength
  }

  setLength (char) {
    if (char === '\r') {
      if (this.length === 0) {
        this.isFinished = true
      }
      this.current = this.waitLengthLineEnd
    } else {
      this.length *= 16
      this.length += parseInt(char, 16)
    }
  }
  waitLengthLineEnd (char) {
    if (char === '\n') {
      this.current = this.readTrunk
    }
  }
  readTrunk (char) {
    this.content.push(char)
    this.length --
    if (this.length === 0) {
      this.current = this.waitNewLine
    }
  }
  waitNewLine (char) {
    if (char === '\r') {
      this.current = this.waitNewLineEnd
    }
  }
  waitNewLineEnd (char) {
    if (char === '\n') {
      this.current = this.setLength
    }
  }

  receiveChar (char) {
    this.current(char)
  }
}

void async function () {
  const request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8088',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed'
    },
    body: {
      name: 'per'
    }
  })

  const response = await request.send()

  let dom = parser.parseHTML(response.body)
  let viewport = images(800, 600)

  render(viewport, dom)
  viewport.save('viewport.jpg')
}()
