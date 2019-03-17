const http = require("http")
const fs = require("fs")

let server = http.createServer((request, response) => {
  const URL = request.url.toLowerCase()
  console.log(URL)
  let log = request.headers
  log.time = new Date
  fs.appendFileSync("./log/log.txt",JSON.stringify(log)+",\n")
  let data
  if(URL.match(/.*jquery\.js$/gi)){
    data = fs.readFileSync("./jquery.js","utf8")
//}else if(){
  }else{
    try{
//      data = fs.readFileSync(`./views/${URL}`,"utf8")
      data = fs.readFileSync(`./views/${URL}`)
    }catch(e){
      response.writeHead(404, {"Content-Type": "text/html"})
      response.end(fs.readFileSync("./views/error/404.html"))
      return
    }
  }
  //ステータスコード
  if(URL.match(/.+\.html$/)){
    response.writeHead(200,{"Content-Type":"text/html"})
  }else if(URL.match(/.+\.js$/)){
    response.writeHead(200,{"Content-Type":"text/javascript"})
  }else if(URL.match(/.+\.png$/)){
    response.writeHead(200,{"Content-Type":"image/png"})
  }else{

  }

  response.write(data)
  response.end()
})

server.listen(7080)
