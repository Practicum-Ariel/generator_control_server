require('dotenv').config()

// MongoDB connection
require('./DL/connect').connect()

const express = require('express');
const mainRouter = require('./routes');
const PORT = process.env.PORT || 3000;
const cors = require('cors')


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', mainRouter);




app.listen(PORT, () => {
   console.log(`Server is running on  http://localhost:${PORT}/api`);
});