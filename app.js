const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



//Defining a simple route
app.get('/', (req, res) => {
  res.send('hello, dudes');
});


//starting the server on port 3001
const { PORT = 3001, BASE_PATH } = process.env;


mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_PATH}`);
});
