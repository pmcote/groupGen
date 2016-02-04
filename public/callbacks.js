CALLBACKS = {
  success: {
    // Make changes to DOM to add new clas
    createClass: function(data) {
      console.log('callback data', data.name);
      registerSubmits();
    },

    addStudent: function(data) {
      console.log('callback data', data.name);
      registerSubmits();
    }
  },

  error: function(data, status) {
	// Default error callback
    	console.log('Error!' + data);
	}
}
