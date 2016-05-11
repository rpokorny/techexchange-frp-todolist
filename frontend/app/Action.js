import * as Immutable from 'immutable';
import Todo from './model/Todo';

/**
 * This module defines action contructors - functions that return Actions.
 *
 * Actions are themselves functions which take a model representing the current
 * state of the system and return a new model representing a new state for the system
 */

//many actions here unset the error message.  This function abstracts that
const noError = model => model.set('errorMessage', null);

//This function simply turns on the loading spinner and removes any error message
export function Loading() {
    return model => noError(model.set('loading', true));
}

//this function sets the error message based on the parameter.
//`error` can either be a string or an Error object.
export function SetErrorMessage(error) {
    const message = error instanceof Error ? error.message : error;

    return model => model.merge({
        loading: false,
        errorMessage: message
    });
}

/**
 * Receives the full list of todos as a pojo array, and uses that to set the todo list
 * in the model
 */
export function SetTodos(todos) {
    //create a Immutable collection of Todo models.
    //We use Immutable.Iterable, and them convert to List at the end, to avoid the expense of
    //creating an extra intermediate list (the Iterable is just a wrapper around the array)
    const models = Immutable.Iterable(todos)
        .map(Todo)
        .toList();

    return model => noError(model.set('todos', models));
}

/**
 * Takes a Todo pojo and adds it to the list of todos
 */
export function AddTodo(todo) {
    const todoModel = Todo(todo),   //todo as model (not pojo)
        id = todo.id;               //id of new todo

    return function(model) {
        //todos already in the state
        const existingTodos = model.todos,

            //existing todo with same id (shouldn't exist)
            existingTodo = existingTodos.find(t => t.id === id);

        if (existingTodo) {
            return model.set('errorMessage', 'Id conflict');
        }
        else {
            //the list of todos with the new todo appended
            const newTodos = existingTodos.push(todoModel);

            return noError(model.set('todos', newTodos));
        }
    };
}

/**
 * Delete the todo with the specified id
 */
export function DeleteTodo(id) {
    return function(model) {
        //split the todos into two lists - ones that match the id and ones that don't
        const groups = model.todos.groupBy(t => t.id === id ? 'del' : 'keep');

        if (groups.get('del')) {
            return noError(model.set('todos', groups.get('keep') || Immutable.List()));
        }
        else {
            //couldn't find anything to delete
            return model.set('errorMessage', `Id ${id} not found`);
        }
    };
}

/**
 * Update the Todo with the given id
 * @param todo A POJO representing the Todo
 */
export function UpdateTodoById(id, todo) {
    const todoModel = Todo(todo);

    return function(model) {
        const index = model.todos.findIndex(t => t.id === id);

        if (index !== -1) {
            return noError(model.update('todos', todos => todos.set(index, todoModel)));
        }
        else {
            return SetErrorMessage(`Id ${id} not found`);
        }
    };
}

/**
 * Set the name on the model that represents the Todo currently being added
 */
export function SetAddingName(name) {
    return model => model.set('addingName', name);
}

/**
 * Sets the value of the name currently being edited
 */
export function SetEditName(name) {
    return model => model.set('editName', name);
}

/**
 * Sets of the `editing` and `editName` parameters to start editing the
 * todo with the given id
 */
export function StartEdit(id) {
    return function(model) {
        const todo = model.todos.find(t => t.id === id);

        if (todo) {
            return model.merge({
                editing: id,
                editName: todo.name
            });
        }
        else {
            return model.set('errorMessage', `Id ${id} not found for editing`);
        }
    };
}

/**
 * Cancels editing a name
 */
export function CancelEdit() {
    return model => model.merge({
        editing: null,
        editName: null
    });
}

/**
 * At this level, concluding an edit looks the same as cancelling it
 */
export const ConcludeEdit = CancelEdit;

/**
 * Remove any current error message
 */
export function DismissError() {
    return noError;
}

/**
 * Reset the addingName.  When you delete a property on an immutable record, it
 * actually gets set back to the default
 */
export function ClearAddingName() {
    return model => model.delete('addingName');
}
