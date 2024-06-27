import mongoose from "mongoose";
import express from 'express'
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.route.js'
import bookRouter from './routes/book.route.js'
import userRouter from './routes/user.route.js'
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
// Allow credentials and set specific origin
const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  credentials: true,
};

app.use(cors(corsOptions));
const port = 4000;

mongoose.connect('mongodb+srv://abhishek:abhishek@bookshelf.lb9mkcb.mongodb.net/BookShelf')
.then(()=>
{console.log('connected to mongodb');})
.catch((err)=>{console.log(err);});

app.use(express.json());


app.use(cookieParser())

dotenv.config()


app.use('/api/auth',authRouter);
app.use('/api/book',bookRouter);
app.use('/api/user',userRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
