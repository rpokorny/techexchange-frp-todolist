import React from 'react';

//example of using a third-party component.  Be aware that
//not all third-party react components were designed with stateless
//UI principles in mind, and some will not work with this architecture
import Toggle from 'react-toggle';

import { sendAction } from '../frp/ActionPool';
import AsyncActionPool from '../frp/AsyncActionPool';
import { SetEditName, CancelEdit, StartEdit } from '../Action';
import { SetTodoCompleted, ConcludeEdit, DeleteTodo } from '../AsyncAction';

import Todo from '../model/Todo';

const sendAsyncAction = AsyncActionPool.sendAction;

/**
 * Event handler functions
 */

function updateEditName(evt) {
    sendAction(SetEditName(evt.target.value));
}

function editorKeyPress(evt) {
    switch (evt.keyCode) {
        case 13: //ENTER
            sendAsyncAction(ConcludeEdit());
            break;
        case 27: //ESC
            sendAction(CancelEdit());
            break;
        default:
            break;
    }
}

function startEdit(id) {
    sendAction(StartEdit(id));
}

function toggleCompleted(id, evt) {
    const completed = evt.target.checked;

    sendAsyncAction(SetTodoCompleted(id, completed));
}

function deleteTodo(id) {
    sendAsyncAction(DeleteTodo(id));
}

/**
 * Component that represents a single row in the
 * Todo list
 */
export default function TodoCmp({todo, idBeingEdited, editName, className}) {
    const {id, name, completed} = todo,
        editing = id === idBeingEdited,
        nameEl = editing ?
            //if editing, show a text box.  The value should be the
            //current (unsaved) editName
            <input type="text" value={editName} onChange={updateEditName}
                onKeyPress={editorKeyPress}/> :

            //if not editing, show the name as a span.  Note the use
            //of bind to set up the doubleclick handler
            <span onDoubleClick={startEdit.bind(null, id)} className="name">{name}</span>;

    return (
        <li className={className}>
            {nameEl}
            <Toggle className="completed-toggle" onChange={toggleCompleted.bind(null, id)}
                checked={completed} />
            <button className="delete" onClick={deleteTodo.bind(null, id)}>&times;</button>
        </li>
    );
}

TodoCmp.propTypes = {
    todo: React.PropTypes.instanceOf(Todo),
    idBeingEdited: React.PropTypes.string,
    editName: React.PropTypes.string,
    className: React.PropTypes.string
};
