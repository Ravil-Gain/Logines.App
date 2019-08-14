const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.DB_Connect,
    { useNewUrlParser: true },
    () => console.log('db connected!')
);
//import routes
const authRoute = require('./routes/auth');

app.use(express.json());

//Routes Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('start'));
