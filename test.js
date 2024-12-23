const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const User = mongoose.model('User', new mongoose.Schema({ name: String }));
    return User.create({ name: 'Test Users' });
  })
  .then(user => {
    console.log('User created:', user);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error:', err);
  });