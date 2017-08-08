const mongoose = require('mongoose');
// local test，use fusquare_develop_db for develop
const uri = 'mongodb://localhost/fusquare_develop_db';
mongoose.Promise = global.Promise;

mongoose.connect(uri, {useMongoClient: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected!');
});
