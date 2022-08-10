import { config } from "dotenv";
config();
import express from "express";
import db from "./config/db";
import router from "./routes";
import passport from "passport";
require("./strategies/google");
import session from "express-session";
import cloudinaryConfig from "./config/cloudinary";
import cors from 'cors'


const App = express();
const PORT = process.env.PORT;
const start = async () => {
  try {
    await db.authenticate();
    console.log(`DB Connected . . .`);
    App.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    App.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      })
    );
    App.use(cors({
      origin : ['http://localhost:3000']
    }))
    App.use(cloudinaryConfig)
    App.use(express.json())
    App.use(express.urlencoded({extended : true}))
    App.use(router);
    App.use(passport.initialize());
    App.use(passport.session());
  } catch (error) {
    console.log(error);
  }
};

start();
