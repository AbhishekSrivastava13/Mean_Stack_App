const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TestUsers',{useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify: false})
    .then(() => {

        console.log("Database connected")
    })
    .catch((error) => {
        console.log("Error : "+error)

    });

module.exports = mongoose;