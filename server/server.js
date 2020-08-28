const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const template = require('./../template');
import devBundle from './devBundle';

const app = express();
devBundle.compile(app); // remove for prod

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
  res.status(200).send(template());
});

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/starter';
const port = process.env.PORT || 3000;

MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch((err) => console.log('database is not connected'));

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Server started on port %s.', port);
});
