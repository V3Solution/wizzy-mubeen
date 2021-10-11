const express = require('express');
const user = require('../Routes/userRoutes')
const auth = require('../Routes/authRoutes')
const category = require('../Routes/categoryRoute')
const product = require('../Routes/addProductRoute')
module.exports = function(app) {
  app.use(express.json());
  app.use('/wizzy/user', user);
  app.use('/wizzy/auth', auth);
  // app.use('/wizzy/category',category)
  // app.use('/wizzy/product',product)
}