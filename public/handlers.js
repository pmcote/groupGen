HANDLERS = {
  makeClassSubmit: function(route, success) {
    return function(event) {
      // The dom element that instantiated the event
      var $form = $(event.target);
      console.log('event target', event.target);
      postData = {};
      postData.name = $form.find('input#class-name').val();
      console.log('postData', postData);

      event.preventDefault();
      $.post(route, postData).done(success).error(CALLBACKS.error);
    }
  },

  makeStudentSubmit: function(route, success) {
    return function(event) {
      // The dom element that instantiated the event
      var $form = $(event.target);
      console.log('event target', event.target);
      postData = {};
      postData.name = $form.find('input#student-name').val();
      postData.className = $form.parent().find('h1').text();
      console.log('postData', postData);

      event.preventDefault();
      $.post(route, postData).done(success).error(CALLBACKS.error);
    }
  },

  // redirectGroupGen: function(route, success) {
  //   return function(event) {
  //     var $form = $(event.target);
  //     console.log('event target', event.target);
  //     classToGroup = {};
  //     classToGroup.name = $form.parent().find('h1').text();
  //     // console.log('class to make groups with', classToGroup);
  //     // console.log('route', route + '/' + classToGroup.name);
  //     // route = route + '/' + classToGroup.name;
  //     event.preventDefault();
  //     $.get(route, classToGroup).done(success);
  //   }
  // },

  groupSort: function(route, success) {
    return function(event) {
      var $form = $(event.target);
      var number = $form.find("[name='number']").val();
      var typegroup = $form.find("[name='typegroup']:checked").val();
      var classname = $form.parent().find('h1').text();
      sortParams = {};
      sortParams.number = number;
      sortParams.typegroup = typegroup;
      sortParams.classname = classname;
      console.log('sortParams', sortParams);
      event.preventDefault();
      $.get(route, sortParams).done(success);
    }
  }
}
