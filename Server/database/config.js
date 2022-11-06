const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI)
    .then(
        () => {
            console.log("Database connected")
        },
        (err) => {
            console.log("Error to connect to database", err)
        }
    );