import * as Immutable from 'immutable';

import Todo from './Todo';

/**
 * The model that represents the overall state of the frontend.
 * Immutable.Record is sort of a meta-constructor.  The return of this call to
 * Immutable.Record is another function, which can be used to construct records with
 * the properties and default values specified here
 */
export default Immutable.Record({
    loading: false,
    errorMessage: null,
    editing: null,  //null if not editing, id of listing to edit if editing
    editName: null, //when editing, the unsaved value of the edit box
    todos: Immutable.List(), //of Todo
    addingTodo: Todo()       //an unsaved Todo record that stores the state of the "add-new" area
});
