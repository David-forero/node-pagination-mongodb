const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//initializing
const app = express();

//database
mongoose.connect('mongodb://localhost/node-paginacion', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log("Database is connect"))
    .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());//lo que me enviara de datos en el navegador (el json)
app.use(bodyParser.urlencoded({extended: false}));
//routes
const indexRouter = require('./routes/index.js');
app.use('/', indexRouter);

//server listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
