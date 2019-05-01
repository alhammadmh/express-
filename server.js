require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const Company = require('./models/company');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/companys',
{useNewUrlParser : true})
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err))

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));



//INDEX
app.get('/companys', (req, res) => {
  Company.find()
  .then((companys)=>{
    res.render('index', { companys })
  }).catch(err => console.log(err))
})

//NEW
app.get('/companys/new', (req, res) => {
  res.render('new')
})

//POST
app.post('/companys', (req, res) => {

  let data = {
    name: req.body.name, 
    color: req.body.color
  }

//   if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on'
//     data.readyToEat = true
//   } else { // if not checked, req.body.readyToEat is undefined
//     data.readyToEat = false
//   }

  let company = new Company(data)
  company.save()
  .then(()=> {
    res.redirect('/companys')
  }).catch(err => console.log(err))

  
})

//SHOW
app.get('/companys/:indexOfCompanysArray', (req, res) => {
  Company.findById(req.params.indexOfCompanysArray)
  .then((company)=>{
    res.render('show', {
      company: company
    })
  })
})

//EDIT
app.get('/companys/:indexOfCompanysArray/edit', (req, res) => {
  Company.findById(req.params.indexOfCompanysArray)
    .then(company => {
      res.render('edit', { company })
    })
})

//DELETE
app.delete('/companys/:indexOfCompanysArray', (req, res) => {
  Company.findByIdAndDelete(req.params.indexOfCompanysArray)
    .then(() => {
      res.redirect('/companys');
    })
})

//PUT
app.put('/companys/:indexOfCompanysArray', (req, res) => {
  
  Company.findByIdAndUpdate(req.params.indexOfCompanysArray, updatedCompany)
    .then(company => {
      res.redirect(`/companys/${company._id}`);
    })
})

app.listen(3000, () => {
  console.log(`Listening on port ${3000}`);
})
