const express = require('express');
const app = express();

//import routes
const authRoute = require('./routes/auth');

//Routes Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('start'));
