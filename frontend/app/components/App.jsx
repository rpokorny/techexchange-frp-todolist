import React from 'react';

import Model from '../model/Model';

//import the UI component for individual Todo items
import Todo from './Todo';

import ActionPool from '../frp/ActionPool';
import AsyncActionPool from '../frp/AsyncActionPool';
import { SetAddingName } from '../Action';
import { AddTodo } from '../AsyncAction';

//handler for changes to the new Todo text box - like all handlers in this architecture, it
//essentially converts the user input into an Action that further drives the state
function updateAddingName(evt) {
    ActionPool.sendAction(SetAddingName(evt.target.value));
}

function handleAddNewKeydown(evt) {
    //detect ENTER and save the todo when it is pressed
    if (evt.keyCode === 13) {
        AsyncActionPool.sendAction(AddTodo());
    }
}

/**
 * React component that represents the entire UI.  Note that we use React's new-ish Stateless
 * Functional Component style (the component is just a function) instead of the older
 * React.createClass style.  This is possible because the FRP style keeps all mutable state
 * out of the UI components.  Each component is simply a pure function from props to VDOM.
 *
 * Note that the component's props objects is destructured in the parameter list
 */
export default function App({model}) {
    const {todos, errorMessage, addingName, editName, editing} = model,

        //function to create a <Todo> component for a Todo model.  Whenever creating a list
        //of components, the `key` prop is required so react can efficiently keep track of
        //which is which in case of reordering or deletion
        mkTodo = todo =>
            <Todo key={todo.id} todo={todo} idBeingEdited={editing} editName={editName} />,

        //create a list of <Todo> components from the todos.  One of the great things about
        //react is that this type of logic is done in plain old js instead of some half-baked
        //template language
        todoEls = todos
            .toSeq()                                //create lazy seq to avoid intermediate
                                                    //collections

            .map(mkTodo)                            //create a <Todo> for each Todo

            .toArray();                             //convert the seq to an array since react
                                                    //cannot directly handle Immutable.js
                                                    //collections

    //Note that in jsx, you use className instead of class, since class is a reserved
    //word in javascript
    return (
        <section id="todoapp">
            <header id="header">
                <h1>FRP Todo List</h1>
                <input type="text" id="new-todo" placeholder="What needs to be done?"
                    autofocus value={addingName}
                    onChange={updateAddingName} onKeyDown={handleAddNewKeydown} />
            </header>
            { /* Only include this next <section> if there is an errorMessage */ }
            { errorMessage &&
                <section className="error-message">
                    {errorMessage}
                </section>
            }

            <section id="main">
                <ul id="todo-list">
                    {todoEls}
                </ul>
            </section>
        </section>
    );
}

//By setting propTypes on the component definition, we tell react what props are expected so
//that it can warn us if something isn't being passed in
App.propTypes = {
    model: React.PropTypes.instanceOf(Model).isRequired
};
