const app = require("express")();
const server = require("http").createServer(app);
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

dotenv.config();
//MIDDLEWARES
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));

app.set("trust proxy", 1); // trust first proxy

app.use(passport.initialize());
app.use(passport.session());
require("./Configuration/passportconfig")(passport);
//TODO FIX OAUTH2 GOOGLE
//require("./Configuration/GoogleAuthConfig")(passport);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", socket => {
  console.log("A user is connected");

  socket.on("message", message => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});
module.exports = io;


//INIT ROUTES

const authRoute = require("./Routes/auth.routes");
const controllerRoutes = require("./Routes/collection.routes");
const userpageRoutes = require("./Routes/userpage.routes");
const itemRoutes = require("./Routes/item.routes");
const adminRoutes = require("./Routes/admin.routes");
app.use("/v1",authRoute);
app.use("/collection",controllerRoutes);
app.use("/userpage",userpageRoutes)
app.use("/items",itemRoutes)
app.use("/admin",adminRoutes);
app.get("/",(req,res) => {
    console.log(req.user);
    res.send("Hello user");
})
app.use("/uploads",require("express").static("uploads"))
module.exports = server;