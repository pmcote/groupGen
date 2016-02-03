var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
  name: String,
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'student'}]
});

module.exports = mongoose.model('class', classSchema);
