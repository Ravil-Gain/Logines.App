const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute =require('./routes/auth');
const userWorkTime = require('./routes/userWorkTime');
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('db connected!')
);

app.use(express.json());
app.use(cors());

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/userWorkTime', userWorkTime);

app.listen(3000, () => console.log('start'));
