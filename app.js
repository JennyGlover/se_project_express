const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const clothingItemRoutes = require('./routes/clothingitems');

//Middleware to parse incoming JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//routes for users and clothing items
app.use('/users', userRoutes);
app.use('/items', clothingItemRoutes)


//simple get request
app.get('/', (req, res) => {
  res.send('Hello, dudes');
});

//Database connection
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

//starting the server on port 3001
const { PORT = 3001, BASE_PATH = 'localhost' } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_PATH}:${PORT}`);
});
