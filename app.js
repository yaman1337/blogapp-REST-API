const express = require('express');
const mongoose = require('mongoose');
const { PORT, db_url } = require('./env');
const app = express();
const path = require('path');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// routes
app.use('/api/v1', require('./controllers/handleAuth'));
app.use('/api/v1', require('./controllers/handlePost'));
app.use(require('./controllers/handleClient'));
app.use('/css', express.static(path.join(__dirname, '/client' + '/css')));
app.use('/js', express.static(path.join(__dirname, '/client' + '/js')));


// make database connection
const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(db_url, mongodbOptions, (err) => {
    if(err) return console.log(err)
    console.log("Connected to database.")
});

// listener
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is up and running on port ${process.env.PORT || PORT}`);
});
