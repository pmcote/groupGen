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
  }
}
