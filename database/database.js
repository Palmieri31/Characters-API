const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/charactersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Db is connected'))
  .catch((error) => console.log(error));
