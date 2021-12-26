require("rootpath")();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const serverless = require("serverless-http");
const jwt = require("jsonwebtoken");
const { secret } = require("config.json");
const errorHandler = require("_middleware/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[1]
    ) {
        jwt.verify(
            req.headers.authorization.split(" ")[1],
            secret,
            function (err, decodedToken) {
                if (err) {
                    /* handle token err */
                    console.log("error", err);
                } else {
                    console.log("decodedToken", decodedToken);
                    req.userId = decodedToken.id; // Add to req object
                }
            }
        );
    }
    next();
});

// allow cors requests from any origin and with credentials
app.use(cors());

// api routes
app.use("/accounts", require("./accounts/accounts.controller"));

// global error handler
app.use(errorHandler);

// start server
const port =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

app.listen(port, () => {
    console.log("Server listening on port " + port);
});