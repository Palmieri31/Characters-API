const { Schema, model } = require("mongoose");

const characterSchema = new Schema (
{
  name: {
    type: String,
  },
  creator: {
    type: String,
  },
  firstApparition: {
    type: Date,
  },
	imgUrl: {
		type: String,
	},
  videogames: [
    {
      ref: "Videogame",
			type: Schema.Types.ObjectId    
    },
  ],
},
{
  timestamps: true,
  versionkey: false
});

module.exports = model('Character', characterSchema);