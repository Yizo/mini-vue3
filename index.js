const http = require('http')
const port = 3017

const server = http.createServer((req, res)=>{
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    const json ={
        code: 0,
        data: [12]
    }
    res.end(JSON.stringify(json))
})

server.listen(port, ()=>{
    console.log(`服务运行在 http://192.168.21.191:${port}`)
})

server.on('error', (res)=>{
    console.log('服务运行异常:' + res)
})