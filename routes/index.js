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

routes.groupGen = function(req, res) {
  console.log('groupGen body', req.body);
  res.end('.');
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
  // Save student or get id if student exists
  Student.count({'name': studentName}, function(err, count) {
    if (!count){
      saveStudent.save(function(err) {
        if (err) {
          console.log('err saving', err);
        } else {
          console.log('save success');
        }
      });
    } else {
      saveStudent = Student.findOne({'name': studentName}, function(err, student) {
        console.log('err finding duplicate', err);
      });
    }
  });

  // Add more err handling here for robustness
  // Add reference to student in class
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
