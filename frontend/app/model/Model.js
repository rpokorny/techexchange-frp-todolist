import * as Immutable from 'immutable';

/**
 * The model that represents the overall state of the frontend.
 * Immutable.Record is sort of a meta-constructor.  The return of this call to
 * Immutable.Record is another function, which can be used to construct records with
 * the properties and default values specified here
 */
export default Immutable.Record({
    errorMessage: null,         //null if no error, string message if error
    editing: null,              //null if not editing, id of listing to edit if editing
    editName: null,             //when editing, the unsaved value of the edit box
    todos: Immutable.List(),    //List of Todo objects
    addingName: ''              //The name of the todo that is in-process of being added
});
