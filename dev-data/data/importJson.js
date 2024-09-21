const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tours = require('../../models/tourModel');
const fs = require('fs');
// mongoose configuration
dotenv.config({ path: '../../config.env' });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8'),
);
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB).then((con) => {
  console.log('DB connection established');
});

const importJson = async (req, res) => {
  try {
    await Tours.create(tours);
    console.log('Successfully imported');
  } catch (err) {
    console.log(err);
  }
};

const deleteAll = async (req, res) => {
  try {
    await Tours.deleteMany();
  } catch (e) {
    console.log(e);
  }
};
// deleteAll();
// importJson();
