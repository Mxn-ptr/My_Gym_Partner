const express = require('express');
const {checkUser, requireAuth} = require('./middlewares/auth')
const cookieParser = require('cookie-parser')
const path = require('path');
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user');
const cors = require('cors');
require('dotenv').config({path: './config/.env'});
require('./config/db');

const app = express();

const corsOptions = {
  origin: process.env.URL_CLIENT,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions));

// Parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes)

// Server listening
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
