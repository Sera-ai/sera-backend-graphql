const mongoose = require('mongoose');
const mongoConfig = require('../../config/mongoConfig');

async function connectToDatabase() {
  await mongoose.connect(mongoConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}

module.exports = {
  connectToDatabase,
};
