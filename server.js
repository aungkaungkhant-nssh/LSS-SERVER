const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth/authRoutes');
const fundRoutes = require('./routes/user/fundRoutes');
const expenseRoutes = require('./routes/user/expenseRoutes');
require('dotenv').config();

app.use(cors());


mongoose.set("strictQuery",true)
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/api/auth',authRoutes);
app.use('/api/fund',fundRoutes);
app.use("/api/expense",expenseRoutes)
const PORT = process.env.PORT || 8000;


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t9jp2.mongodb.net/${process.env.DB_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})


