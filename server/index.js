import express from 'express'
const app =  express();
import mongoose from'mongoose'
import cors from'cors'
import useRouter from './routes/user.js'
import useExpense from './routes/expense.js'
import dotenv from 'dotenv'

dotenv.config();

app.set('view engine','ejs')

app.use(
  cors({
    origin:"*",
  })
);


app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))

app.use('/user',useRouter)
app.use('/expense',useExpense)

app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.use(cors());

app.get('/',  ((req,res) => {
  res.send("hi");
}))


const connect_url =process.env.MONGODB_CONNECT;
mongoose.connect(connect_url,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => app.listen(8000, () => {
      console.log("success")
})).catch((err) => console.log(err.message))
