import express from 'express';
import cors from 'cors';
import router from './router';
import mongoose from 'mongoose';
import 'dotenv/config';
import loadSwagger from './swagger'; 

const app = express();
loadSwagger(app);
const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use('/', router);
const mongoConnect = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error('Database URL is not provided in the .env file');
    } 
    await mongoose.connect(process.env.DB_URL);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('Connection to db failed: ', (error as Error).message);
  }
};

mongoConnect()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});