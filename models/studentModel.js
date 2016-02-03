var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  name: String,
  properties: [String]
});

module.exports = mongoose.model('student', studentSchema);
