import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/users.js';
import interviewerRoutes from './routes/interviewer.js'; 
import jobTrackerRoutes from './routes/jobtracker.js';
import resumesAtsRoutes from './routes/resumesAts.js';
import submittedResumesRoutes from './routes/resumes.js';
import jobRoutes from './routes/jobs.js';

import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome ats");
});

app.use('/users', userRoutes);
app.use('/interviewer', interviewerRoutes);
app.use('/jobtracker', jobTrackerRoutes);
app.use('/resumesAts', resumesAtsRoutes);
app.use('/resumes', submittedResumesRoutes);
app.use('/jobs', jobRoutes);
app.use("/api/v1/auth", authRoutes);

mongoose.connect(mongoDBURL).then(() => {
  console.log("App is connected to the database");
  app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
  });
});
