const express =require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
app.use(bodyParser.json());
const postroutes = require('./routes/post.js');
app.use('/servicios', postroutes);
mongoose.connect('mongodb+srv://alarconbraianm:Gato2209@modulo6.uaqwymm.mongodb.net/?retryWrites=true&w=majority&appName=modulo6') , {
    useNewUrlParser: true,
    useUnifiedTopology: true
} 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB conexion exitosa');
});

app.listen(10000);