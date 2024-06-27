require('dotenv').config()

// MongoDB connection
require('./DL/connect').connect()

const express = require('express');
const mainRouter = require('./routes');
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const http = require('http')
const app = express();
const server = http.createServer(app)

const socketIO = require('socket.io');
const socketFn = require('./socket');

const io = new socketIO.Server(server, {
   cors: {
      origin: '*'
   }
})

io.on('connection', socketFn)

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', mainRouter);


server.listen(PORT, () => {
   console.log(`Server is running on  http://localhost:${PORT}/api`);
});