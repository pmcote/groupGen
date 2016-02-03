var mongoose = require('mongoose');
var Student = require('../models/studentModel.js');
var Class = require('../models/classModel.js');

var routes = {};

routes.home = function(req, res) {
  // get a list of the classes and students
  Class.find({}, function(err, classes) {
    console.log('classes:', classes);
     var renderData = {classes: classes};
    res.render('classes', renderData);
  });
},

routes.createClass = function(req, res) {
  var newName = req.body;

  saveClass = new Class(newName);

  Class.count({'name': newName.name}, function(err, count) {
    if (!count){
      saveClass.save(function(err){
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
