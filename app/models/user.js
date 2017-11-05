const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;
const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    unique: true
  },
  password: String,
  role:{
    type: Number,
    default: 0
  },
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }],
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  },
  token: String
})

UserSchema.pre('save',function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)