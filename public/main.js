var $addClass;
var $addStudent;
var $redirectGroupGen;

registerSubmits();

function registerSubmits() {
  // Unbind existing handlers
  $addClass = $('form#createClass').unbind();
  $addStudent = $('form#addStudent').unbind();
  $redirectGroupGen = $('form#groupGen').unbind();

  // Create submit handlers for the ajax requests
  $addClass.submit(HANDLERS.makeClassSubmit('createClass', CALLBACKS.success.createClass));
  $addStudent.submit(HANDLERS.makeStudentSubmit('addStudent', CALLBACKS.success.addStudent));
  $redirectGroupGen.submit(HANDLERS.redirectGroupGen('groupGen', CALLBACKS.success.redirectGroupGen));
}
