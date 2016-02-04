var mongoose = require('mongoose');
var Student = require('../models/studentModel.js');
var Class = require('../models/classModel.js');

var routes = {};

routes.home = function(req, res) {
  // get a list of the classes and students
  Class
  .find({})
  .populate('students', 'name')
  .exec(function(err, classes) {
    var renderData = {classes: classes};
    res.render('classes', renderData);
  });
},

routes.createClass = function(req, res) {
  var newName = req.body;
  var saveClass = new Class(newName);

  Class.count({'name': newName.name}, function(err, count) {
    if (!count){
      saveClass.save(function(err) {
        if (err){
          console.log('err saving', err);
        } else {
          console.log('save success');
          res.end('.');
        }
      })
    } else {
      res.end();
    }
  });
},

routes.addStudent = function(req, res) {
  var classAdd = req.body.className;
  var studentName = req.body.name;
  var student = {name: studentName};
  console.log('student', student);

  var saveStudent = new Student(student);

  saveStudent.save(function(err) {
    if (err) {
      console.log('err saving', err);
    } else {
      console.log('save success');
    }
  });

  console.log('student.id', saveStudent._id);

  Class.findOneAndUpdate({name: classAdd},
    {$push: {students: {_id: saveStudent._id}}},
    {safe: true, upsert: true},
    function(err, classRes){console.log(err)});
}

module.exports = routes;

// {'classes': [
//   {'name': 'Sex Ed',
//    'students': [
//      {
//        'name': 'Paige'
//      },
//      {
//        'name' : 'Avalon'
//      }
//    ]
//   },
//  {'name': 'Dismember the Patriarchy',
//   'students': [
//     {
//       'name': 'Paige'
//     },
//     {
//       'name' : 'Avalon'
//     }
//   ]
//  }
// ]}
