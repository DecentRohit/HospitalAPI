import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { ApplicationError } from "./error-handler/applicationError.js";
import bodyParser from "body-parser";
import cors from 'cors';
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import doctorRouter from "./src/features/doctors/doctor.routes.js";



const server = express();

/// CORS policy configuration
var corsOptions = {
  origin: "*"
}
//cross-origin access
server.use(cors(corsOptions));

//read req.body json
server.use(bodyParser.json()) 
//route to access by doctors
server.use('/api/users', doctorRouter)


//return at homepage
server.get('/', (req, res) => {
  res.status(201).send("Hospital API")
})
// Error handler middleware,should be placed at last of all other request
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);

  } if (err instanceof ApplicationError) {
    console.log(err);
    throw new ApplicationError("Something went wrong with database", 500);

  }


  // server errors. //showing only 1 line of long error message
  res.status(401).send(err.message.toString().substring(0, 60) + '...');
});
// 4. Middleware to handle 404 requests.should be placed at end
server.use((req, res) => {
  res.status(404).send("API not found")
});

server.listen(3200, () => {
  console.log("server is running at port 3200")
  // connectToMongoDB();
  connectUsingMongoose();
});
