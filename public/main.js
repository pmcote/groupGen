var $addClass;

registerSubmits();

function registerSubmits() {
  // Unbind existing handlers
  $addClass = $('form#createClass').unbind();

  // Create submit handlers for the ajax requests
  $addClass.submit(HANDLERS.makeSubmit('createClass', CALLBACKS.success.createClass));
}
