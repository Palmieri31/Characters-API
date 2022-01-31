const { Schema, model } = require("mongoose");

const videogameSchema = new Schema (
{
  title: {
    type: String,
  },
  realeseDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  imgUrl: {
    type: String,  
  }
},
{
  timestamps: true,
  versionkey: false
});

module.exports = model('Videogame', videogameSchema);