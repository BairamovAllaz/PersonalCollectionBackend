const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//MIDDLEWARES
app.use(cors());
app.use("/uploads",require("express").static("uploads"));
app.use(cookieParser("secretcode"));
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
require("./Configuration/passportconfig")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
///

//INIT ROUTES

const authRoute = require("./Routes/auth.routes");
app.use("/v1",authRoute);


module.exports = app;