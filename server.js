const express = require('express');
const cors = require('cors');
const app = express();
const connectMongoDB = require('./config/db');
const apiRouter = require('./api/index');

app.use(cors());
// Connect To MongoDB
connectMongoDB();

app.use(express.json({ extended: true }));

//Define Routes
app.use('/api/', apiRouter);

const port = process.env.PORT || 5000;
  
app.listen(port, () => console.log(`Server up and running on port ${port}`));