CALLBACKS = {
  success: {
    // Make changes to DOM to add new class
    createClass: function(data) {
      console.log('callback data', data.name);
      registerSubmits();
    },

    addStudent: function(data) {
      console.log('callback data', data.name);
      registerSubmits();
    },

    redirectGroupGen: function(data) {
      console.log('callback data', data);
      registerSubmits();
    }
  },

  error: function(data, status) {
	// Default error callback
    	console.log('Error!' + data);
	}
}
