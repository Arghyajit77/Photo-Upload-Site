const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv');
const connectDB = require('./config/db,');
//configure env
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
// database connect
connectDB();
// rest object
const app=express()
// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
// Port
const PORT = process.env.PORT || 8080
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`
  );
});