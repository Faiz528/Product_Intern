const express = require('express')
const authenticates = require('../../middleware/auth.js')
const route = express.Router()

const Control = require('../controller/expense')
route.post('/add',Control.PostExpense)
route.post('/edits/:id',Control.UpdateExpense)

route.get('/products' ,Control.GetExpense )

route.get('/edit/:id',Control.EditExpense)

route.delete('/delete/:id',Control.DeleteExpense)
route.get('/products/featured', Control.Featured)

module.exports = route