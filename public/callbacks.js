CALLBACKS = {
  success: {
    // Make changes to DOM to add new class
    createClass: function(data) {
      var className = data.name;
      var $newClass = $('.class-clone').first().clone();
      $newClass.find('h1').html(className);
      $newClass.find('.student-append').empty();
      $('.class-clone').last().after($newClass);
      registerSubmits();
    },

    addStudent: function(data) {
      var className = data.className;
      var studentName = data.studentName;
      var placeStudent = '.'+className;
      var $nameSpan = $('.student-name').first().clone();

      $nameSpan.find('p').html(studentName);
      $(placeStudent).append($nameSpan);
      registerSubmits();
    },

    // redirectGroupGen: function(data) {
    //   console.log('callback data', data);
    //   registerSubmits();
    // },

    groupSort: function(data){
      var groups = data.groups;
      var className = data.classGroups;
      var $groupings = $('.groupings');
      $('<p>'+ className+ ' Groups</p>').appendTo('.group-name');
      for (var group = 0; group<groups.length; group++) {
        console.log('for loop group', group);
        var $div = $('.group').clone();
        $div.removeAttr('class');
        var groupNumber = group+1;
        $div.find('.group-number').html('Group '+groupNumber);
        var studentGroup = '';
        for (var student = 0; student<groups[group].length; student++){
          studentGroup = studentGroup + '<li>'+groups[group][student]+'</li>';
        }
        console.log('studentGroup', studentGroup);
        $div.find('.names').html(studentGroup);
        console.log('toappend', $div);
        $groupings.append($div);
      }
      $groupings.toggle();
      // $div.css('display', 'flex');
      registerSubmits();
    }
  },

  error: function(data, status) {
	// Default error callback
    	console.log('Error!' + data);
	}
}
