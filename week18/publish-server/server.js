let http = require('http')
let https = require('https')
let unzipper = require('unzipper')
let quertstring = require('querystring')

// 2. auth路由： 接收code， 用code + client_id + client_secert换token

function auth(request, response) {
    let query = quertstring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
    getToken(query.code, function(info) {
        // console.log(JSON.stringify(info))
        response.write(`<a href="http://localhost:8083?token=${info.access_token}">publish</a>`)
        response.end()
    })
}

function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.218b590e1dc50a13&client_secret=082d73596f1170f9ef0ce20d4528ee8f908d672c`,
        port: 443,
        method: 'POST'
    }, function(response) {
        let body = ''
        response.on('data', chunk => {
            body += chunk.toString()
        })
        response.on('end', () => {
            callback(quertstring.parse(body))
        })
    })
    request.end()
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布

function publish(request, response) {

    let query = quertstring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])

    getUser(query.token, info => {
        if (info.login === 'preper') { // 权限判断，接入权限系统
            request.pipe(unzipper.Extract({path: '../server/public/'}))

            request.on('end', () => {
                response.end('Success')
            })
        }
    })
}

function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: '/user',
        port: 443,
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            'User-Agent': 'toy-publish-per'
        }
    }, function(response) {
        let body = ''
        response.on('data', chunk => {
            body += chunk.toString()
        })
        response.on('end', () => {
            callback(JSON.parse(body))
        })
    })
    request.end()
}

http.createServer(function(request, response) {
    if (request.url.match(/^\/auth\?/)) {
        return auth(request, response)
    }
    if (request.url.match(/^\/publish\?/)) {
        return publish(request, response)
    }
    // let outFile = fs.createWriteStream('../server/public/index.html')

    // request.pipe(outFile)
    // 上面的代码等价于：
    // request.on('data', chunk => {
    //     outFile.write(chunk)
    // })

    // request.pipe(unzipper.Extract({path: '../server/public/'}))

    // request.on('end', () => {
    //     response.end('Success')
    // })

}).listen(8082)
