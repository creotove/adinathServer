const express = require('express')
const morgan = require('morgan')
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const app = express()

//dotenv conig
dotenv.config();
//Database connection
connectDB();

//Body Parser
app.use(express.json())
app.use(cors(
    origin = "*",
    methods = "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders = "Content-Type,Authorization",
    credentials = true
))

//Morgan for logging
app.use(morgan('dev'))

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/masterAdmin", require("./routes/masterAdminRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/retailer", require("./routes/retailerRoutes"));

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
            .bgCyan.white
    );
});