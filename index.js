const express = require('express');
const mainRouter = require('./routes');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', mainRouter);


// MongoDB connection
require('./DL/connect').connect()

app.listen(PORT, () => {
   console.log(`Server is running on  http://localhost:${PORT}/api`);
});