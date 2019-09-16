const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const factoryRoute = require('./routes/factory');
const verify = require('./routes/util/verifyToken');
const userWorkTimeRoute = require('./routes/userWorkTime');
const factoryWorkTime = require('./routes/factoryWorkTime');
dotenv.config();


const posts = require('./routes/post');


mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('db connected!')
);

app.use(express.json());
app.use(cors());

app.use('/', posts);
//Routes
app.use('/api', verify);
app.use('/login', loginRoute);
app.use('/api/user', userRoute);
app.use('/api/factory', factoryRoute);
app.use('/api/userWorkTime', userWorkTimeRoute);
app.use('/api/factoryWorkTime', factoryWorkTime);
app.listen(3000, () => console.log('start'));
