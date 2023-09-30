const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const categoryRoute = require('./routes/category');
const transactionRoute = require('./routes/transaction');
const budgetRoute = require('./routes/budget');

const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/category', categoryRoute);
app.use('/transaction', transactionRoute);
app.use('/budget', budgetRoute);

// Connect to Mongo DB Atlas
mongoose
.connect(
    process.env.MONGO_URL,
    {useNewUrlParser:true}
).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch(error => {
    console.log("Something went wrong", error);
})

app.listen(PORT, () => {
    console.log("Server started at PORT ", PORT);
})