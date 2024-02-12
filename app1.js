require('dotenv').config();
const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const app = express()
const Parser = require('body-parser')

const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user')
const Expenses = require('./model/expense')

const helmet = require('helmet')
const compressions = require('compression')
const morgan = require('morgan')

const accessLog = fs.createWriteStream(
  path.join(__dirname,'access.log'),{flags:'a'}
)
app.use(Parser.json({extended:false}))
app.use(cors())
app.use(cors({
  origin: '*'
}));
app.use(express.static('public'));
app.use(helmet())
app.use(compressions())
app.use(morgan('combined',{stream:accessLog}))



const Signup = require('./expenses/route/sign')
app.use(Signup)
const Login = require('./expenses/route/log')
app.use(Login)
const Expense = require('./expenses/route/expense')
app.use(Expense)




const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://Faiz:Sharpener2023@faizuddin.tyr9tuj.mongodb.net/Product?retryWrites=true&w=majority').then(result=>{
    console.log("Connected")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(err=>{
    console.log(err)
})

