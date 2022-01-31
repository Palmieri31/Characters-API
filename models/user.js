const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        roleId: {
              ref: 'Role',
              type: Schema.Types.ObjectId,
              default: '61f2fcff3809b9666510faad' 
        }
    },
    {
      timestamps: true,
      versionkey: false
    }
);

module.exports = model('User', userSchema);