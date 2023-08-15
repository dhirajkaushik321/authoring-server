const express = require('express');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');
//import and use cors middleware
//to allow cross origin requests from different origins.
const cors=require("cors");       

const app = express();
//use cors middleware
app.use(
    cors());

app.use(express.json());
app.use('/api/user', userRoutes);

module.exports = app;

