const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error')
const Auth = require('./routes/auth')
const cart = require('./routes/cart')
const order = require('./routes/order')

app.use(express.json());
app.use(cookieParser());


app.use('/api/', Auth);
app.use('/api/', cart);
app.use('/api/', order);

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send(`listening to ${process.env.PORT} and running in ${process.env.NODE_ENV} mode`);
  });

module.exports = app;
