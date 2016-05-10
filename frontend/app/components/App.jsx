import React from 'react';
import classnames from 'classnames';

import Model from '../model/Model';

//import the UI component for individual Todo items
import Todo from './Todo';
import Toggle from 'react-toggle';

import ActionPool from '../frp/ActionPool';
import AsyncActionPool from '../frp/AsyncActionPool';
import { DismissError, SetAddingName, SetAddingCompleted } from '../Action';
import { AddTodo } from '../AsyncAction';

//handler for the error message close button - like all handlers in this architecture, it
//essentially converts the user input into an Action that further drives the state
function dismissError() {
    ActionPool.sendAction(DismissError());
}

function updateAddingName(evt) {
    ActionPool.sendAction(SetAddingName(evt.target.value));
}

function updateAddingCompleted(evt) {
    ActionPool.sendAction(SetAddingCompleted(evt.target.checked));
}

function saveNewTodo() {
    AsyncActionPool.sendAction(AddTodo());
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
    const {loading, todos, errorMessage, addingTodo} = model,

        //use the classnames utility to easily create a string value for the html class attr.
        //In this case we want the <main> element to have a 'loading' class iff the loading
        //property is true.
        //Note that in jsx, you use className instead of class, since class is a reserved
        //word in javascript
        mainClasses = classnames({ loading }),

        //create a list of <li> elements from the todos.  One of the great things about
        //react is that this type of logic is done in plain old js instead of some half-baked
        //template language
        todoEls = todos
            .toSeq()                                //create lazy seq to avoid intermediate
                                                    //collections

            .map(t => <Todo key={t.id} todo={t}/>)  //create a <Todo> component for each element.
                                                    //Whenever creating a list of components,
                                                    //the `key` prop is required so react can
                                                    //efficiently keep track of which is which
                                                    //in case of reordering or deletion

            .toArray();                             //convert the seq to an array since react
                                                    //cannot directly handle Immutable.js
                                                    //collections

    return (
        <main className={mainClasses}>
            <h1>FRP Todo List</h1>
            <div className="loading-spinner"/>

            { /* Only include this next <section> if there is an errorMessage */ }
            { errorMessage &&
                <section className="error-message">
                    {errorMessage}
                    <button className="close" onClick={dismissError}>&times;</button>
                </section>
            }

            <ul>
                {todoEls}
                <li className="add-new">
                    <input type="text" value={addingTodo.name} onChange={updateAddingName} />
                    <Toggle className="completed-toggle" onChange={updateAddingCompleted}
                        checked={addingTodo.completed} />
                    <button className="save" onClick={saveNewTodo}>Save</button>
                </li>
            </ul>
        </main>
    );
}

//By setting propTypes on the component definition, we tell react what props are expected so
//that it can warn us if something isn't being passed in
App.propTypes = {
    model: React.PropTypes.instanceOf(Model).isRequired
};
