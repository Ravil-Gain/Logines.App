const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const verify = require('./routes/util/verifyToken');
const factoryRoute = require('./routes/factory');
const userWorkTimeRoute = require('./routes/userWorkTime');
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('db connected!')
);

app.use(express.json());
app.use(cors());

//Routes Middlewares
app.use('/api', verify);
app.use('/api/user', authRoute);
app.use('/api/factory', factoryRoute);
app.use('/api/userWorkTime', userWorkTimeRoute);

app.listen(3000, () => console.log('start'));
