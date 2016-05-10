import React from 'react';
import ReactDOM from 'react-dom';

//Use this import syntax when dealing with es6 modules that have a default export
import AsyncActionPool from './frp/AsyncActionPool';
import ActionPool from './frp/ActionPool';
import { LoadTodos } from './AsyncAction';
import State from './frp/State';
import App from './components/App';
import Model from './model/Model';

//The Kefir Property that describes the current state of the application at any
//given time
const state = State(ActionPool, AsyncActionPool.stream, Model());

//The DOM element that contains the entire JavaScript UI
const uiElement = document.getElementById('ui');

//This is where Kefir and React get connected - when the state Property changes, re-render
//the React Virtual DOM
state.onValue(function(model) {
    ReactDOM.render(<App model={model} />, uiElement);
});

//Kick things off by loading the todo list from the server
AsyncActionPool.sendAction(LoadTodos());
