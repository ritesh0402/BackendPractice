const mongoose = require('mongoose')
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand')
   .then(() => {
      console.log("Connection Established")
   })
   .catch(error => {
      console.log(`Error: ${error}`)
   });

