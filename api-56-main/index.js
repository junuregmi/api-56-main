// http, https
const http = require("http")
const {Server} = require("socket.io")

// import express application
const app = require("./src/config/express.config")

// server instance adding express application
const server = http.createServer(app)


// socket with node
const io = new Server(server, {
  cors: "*",
})

// events 
io.on("connection", (socket) => {
  socket.on("sentMessage", (data) => {

    socket.emit("messageReceived", data)      // connected client only
    socket.broadcast.emit("messageReceived", data);   // connected all clients

  });
})   // event listen
// io.emit()   // event trigger



// listen to server 
const HOST = "localhost";  // ip or domainname, 127.0.0.1 localhost ::1
// domain => url => abc.com
  // subdomain => api.abc.com
const PORT = process.env.PORT || 443;            // 0 - 2^16 -1


// listen
// server.listen(PORT, HOST, (err) => {
server.listen(PORT, (err) => {
  if(!err) {
    console.log("Server is running on port "+PORT)
    console.log("Press CTRL+C to disconnect the server...")
  }
})