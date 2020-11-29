let http = require('http')
let archiver = require('archiver')
let child_process = require('child_process')
let quertstring = require('querystring')

// 1. 打开 https://github.com/login/oauth/authorize

const client_id = 'Iv1.218b590e1dc50a13'

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=${client_id}`)

// 3. 创建server，接受token，然后点击发布

http.createServer(function(request, response) {
    let query = quertstring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1])
    publish(query.token)
}).listen(8083)

// TODO: 实现response end

function publish(token) {
    let request = http.request({
        hostname: '127.0.0.1',
        port: 8082,
        method: 'POST',
        path: '/publish?token=' + token,
        headers: {
            'Content-Type': 'application/octet-stream',
            // 'Content-Length': stats.size
        }
    }, response => {
        // response.on('end', () => {
        //     request.on('end', () => {
        //         response.end()
        //     })
        // })
    })

    const archive = archiver('zip', {
        zlib: { level: 9 }
    })

    archive.directory('./sample/', false)

    archive.finalize()

    archive.pipe(request)

    archive.on('end', () => {
        request.end()
    })
}



// 单文件发布
// fs.stat('./sample.html', (err, stats) => {
//     let request = http.request({
//         hostname: '127.0.0.1',
//         port: 8082,
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/octet-stream',
//             'Content-Length': stats.size
//         }
//     }, response => {
//         console.log(response)
//     })
    
//     let file = fs.createReadStream('./sample.html')
    
//     file.pipe(request)
//     // 上面的代码等价于：
//     // file.on('data', chunk => {
//     //     console.log(chunk.toString())
//     //     request.write(chunk)
//     // })
//     file.on('end', () => {
//         request.end()
//     })
// })
