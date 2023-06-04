const express = require('express')
const router = require("./src/routers/api");
const app = new express();
require('dotenv').config({ path: "./config.env" });
const bodyParser  = require("body-parser")

// Security Middleware import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp')
const cors = require("cors");
const mongoose = require('mongoose')

// All Middlewares use
app.use(express.static('public'))
app.use(bodyParser.json())

// Security Middlewares use
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// Request rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});
app.use(limiter)

// Database Connection Mongoose
const dbUri = process.env.DATABASE_URI;
const dbConnectOptions = {
    user: "",
    pass: "",
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose.connect(dbUri,dbConnectOptions)
    .then(()=> {console.log("Database Connected")})
    .catch(err => {console.log(`Database connection failed for this error ${err}`)});

app.use("/api/v1", router);
// Handle undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        msg: "404, Request Not" +
            " found"
    })
})

module.exports = app;