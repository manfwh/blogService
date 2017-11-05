var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var PostSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: 'User'
  }, 
  title: String,
  content: String,
  pv: {
    type: Number,
    default: 0
  },
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
})

PostSchema.pre('save',function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('Post', PostSchema)