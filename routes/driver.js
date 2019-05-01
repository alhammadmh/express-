const express = require('express')
const Fruit = require('../models/driver')
// INDEX
app.get('/driver', (req, res) => {
    Driver.find()
      .populate({ path: 'car', select: 'name'})
      .sort('-createdAt')
      .then(driver => {
        res.send(driver);
      })
  })