import { Meteor } from 'meteor/meteor';
import { addTodo, getAllTodo, removeTodo, editTodo, getMenu } from './actions';
import { todosGetAll, todosAdd, todosEdit, todosRemove, menuGetAll } from '../todos/methods';

export function callAddTodo(message) {
    return dispatch =>
        todosAdd.call({ message }, (err, result) => {
            if (err) {
                throw new Meteor.Error(err.message);
            } else {
                dispatch(addTodo({ _id: result, message }));
            }
        });
}

export function callGetAllTodo() {
    console.log('callGetAllTodo');
    return dispatch =>
        todosGetAll.call({}, (err, result) => {
            if (err) {
                throw new Meteor.Error(err.message);
            } else {
                dispatch(getAllTodo(result));
            }
        });
}

export function callRemoveTodo(_id) {
    return dispatch =>
        todosRemove.call({ todoId: _id }, err => {
            if (err) {
                throw new Meteor.Error(err.message);
            } else {
                dispatch(removeTodo(_id));
            }
        });
}

export function callEditTodo(_id) {
    return dispatch =>
        todosEdit.call({ todoId: _id }, err => {
            if (err) {
                throw new Meteor.Error(err.message);
            } else {
                dispatch(editTodo(_id));
            }
        });
}

export function callGetMenu() {
    console.log('callGetMenu');
    return dispatch =>
        menuGetAll.call({}, (err, result) => {
            if (err) {
                throw new Meteor.Error('jkhkjhkj');
            } else {
                dispatch(getMenu(result));
            }
        });
}
