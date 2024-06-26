const express = require('express');
const mainRouter = require('./routes');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv')
const cors = require('cors');
const { connect } = require('./DL/connect');

dotenv.config()
connect()
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', mainRouter);


// MongoDB connection

app.listen(PORT, () => {
   console.log(`Server is running on  http://localhost:${PORT}/api`);
});