import React from 'react';
import classnames from 'classnames';

import ActionPool from '../frp/ActionPool';
import AsyncActionPool from '../frp/AsyncActionPool';
import { SetEditName, CancelEdit, StartEdit } from '../Action';
import { SetTodoCompleted, ConcludeEdit, DeleteTodo } from '../AsyncAction';

import Todo from '../model/Todo';

const { sendAction } = ActionPool;
const sendAsyncAction = AsyncActionPool.sendAction;

/**
 * Event handler functions
 */

function updateEditName(evt) {
    sendAction(SetEditName(evt.target.value));
}

function editorKeyDown(evt) {
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
export default function TodoCmp({todo, idBeingEdited, editName}) {
    const {id, name, completed} = todo,
        editing = id === idBeingEdited,
        editorId = `todo-${id}`,

        //add the completed class if the todo is completed, and the editing class if the
        //name is being edited
        className = classnames({ completed, editing });

    return (
        <li className={className}>
            <div className="view">
                <input type="checkbox" className="toggle" checked={completed}
                    onChange={toggleCompleted.bind(null, id)} />

                <label onDoubleClick={startEdit.bind(null, id)}>{name}</label>

                <button className="destroy" onClick={deleteTodo.bind(null, id)}></button>
            </div>
            { editing &&
                <input className="edit" id={editorId} value={editName} onChange={updateEditName}
                    onKeyDown={editorKeyDown}/>
            }
        </li>
    );
}

TodoCmp.propTypes = {
    todo: React.PropTypes.instanceOf(Todo),
    idBeingEdited: React.PropTypes.string,
    editName: React.PropTypes.string,
    className: React.PropTypes.string
};
