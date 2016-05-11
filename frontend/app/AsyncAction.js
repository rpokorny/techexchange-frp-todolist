import * as Kefir from 'kefir';

import { handleFetchErrors, fetchStream, fetchStreamWithoutData } from './utils/FetchUtils';
import * as Action from './Action';

//this gets injected by webpack
/* global API_ENTRY_URI */
const apiEntryPoint = API_ENTRY_URI,
    handleErrors = handleFetchErrors.bind(null, Action.SetErrorMessage);
/**
 * Each function here is an "Async Action constructor" - that is, a function that returns an
 * AsyncAction.
 *
 * AsyncActions themselves are functions that (optionally) take the current state as input and
 * return a Kefir Stream of Actions.
 */
export function LoadTodos() {

    //create a stream which emits a Loading action, fetches the Todos from the server, and emits
    //a SetTodos action when the server call completes
    return () => Kefir.merge([
        Kefir.constant(Action.Loading()),
        handleErrors(fetchStream(apiEntryPoint).map(Action.SetTodos))
    ]);
}

/**
 * Create an AsyncAction that will save a new Todo with the name and completed status from
 * the Model's addingTodo
 */
export function AddTodo() {

    return function(model) {
        const messageBody = JSON.stringify({
            name: model.addingName,
            completed: false
        });

        return Kefir.merge([
            Kefir.constant(Action.ClearAddingName()),
            handleErrors(fetchStream(apiEntryPoint, 'POST', messageBody).map(Action.AddTodo))
        ]);
    };
}

/**
 * Save changes to the prexisting todo and then update the model
 */
export function UpdateTodo(todo) {
    const uri = todo.id,
        messageBody = JSON.stringify({ name: todo.name, completed: todo.completed }),

        //partially apply the UpdateTodoById action constructor to get a function
        //that receives a todo pojo and creates an action that updates the correct
        //model in the state
        actionMapper = Action.UpdateTodoById.bind(null, uri);

    return () => handleErrors(fetchStream(uri, 'PUT', messageBody).map(actionMapper));
}

/**
 * Delete the todo from the backend and the model
 */
export function DeleteTodo(id) {
    const uri = id,
        action = Action.DeleteTodo(uri);

    //delete the Todo and then emit the DeleteTodo action upon completion
    return () => handleErrors(Kefir.constant(action).sampledBy(
                fetchStreamWithoutData(uri, 'DELETE')));
}

/**
 * Set the value of the `completed` flag on the prexisting model
 */
export function SetTodoCompleted(id, completed) {
    return function(model) {
        const todo = model.todos.find(t => t.id === id);

        if (todo) {
            return UpdateTodo(todo.set('completed', completed))(model);
        }
        else {
            return Kefir.constant(Action.SetErrorMessage(`Id ${id} not found`));
        }
    };
}

/**
 * Conclude editing the name of an existing Todo and save it to the server
 */
export function ConcludeEdit() {
    return function(model) {
        const id = model.editing,
            todo = model.todos.find(t => t.id === id);

        if (todo) {
            return Kefir.merge([
                UpdateTodo(todo.set('name', model.editName))(model),
                Kefir.constant(Action.ConcludeEdit())
            ]);
        }
        else {
            return Kefir.constant(Action.SetErrorMessage(`Id ${id} not found`));
        }
    };
}
