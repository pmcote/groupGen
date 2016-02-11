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

// routes.groupGen = function(req, res) {
//   var className = req.query.name;
//   console.log('className', className);
//   Class
//   .findOne({name: className})
//   .populate('students', 'name')
//   .exec(function(err, thing) {
//     console.log('boop', thing);
//     res.render('grouping', {thing: thing});
//   });
//   // var classes = {'name': 'Sex Ed',
//   //    'students': [
//   //      {
//   //        'name': 'Paige'
//   //      },
//   //      {
//   //        'name' : 'Avalon'
//   //      }
//   //    ]
//   //  };
//   //
//   // console.log(classes.students);
// },

routes.groupSort = function(req, res) {
  var className = req.query.classname;
  Class
  .findOne({name: className})
  .populate('students', 'name')
  .exec(function(err, classData) {
    if (err) {
      console.log('There was an error:', err);
    }

    var students = classData.students;
    var number = req.query.number;
    var typegroup = req.query.typegroup;
    var numbergroups = 1; //default
    var sizegroups;
    var studentNames = [];
    students.forEach(function(student) {
      if (student.name === '') {
        return true
      } else {
        studentNames.push(student.name);
      }
    });

    //Add int parsing and error checking
    if (typegroup === "groupsize") {
      numbergroups = Math.floor(studentNames.length / number);
    } else if (typegroup === "numgroups") {
      numbergroups = number;
    }
    var sizegroups = Math.floor(studentNames.length/ numbergroups);

    // Set up list of lists
    groups = [];
    for (var i=0; i<numbergroups; i++) {
      groups.push([]);
    }

    groups.forEach(function(group){
      var stop = sizegroups;
      console.log('group',group);
      for (var i=0; i<stop; i++) {
        var add = studentNames.pop();
        group.push(add);
      }
    });

    if (studentNames[0]) {
      groups[0].push(studentNames[0])
    }

    var toSend = {};
    toSend.groups = groups;
    toSend.classGroups = className;

    res.send(toSend);
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
  console.log('boop');
  var classAdd = req.body.className;
  var studentName = req.body.name;
  var student = {name: studentName};
  var sendToCallback = {studentName: studentName, className: classAdd};
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

  res.send(sendToCallback);
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
