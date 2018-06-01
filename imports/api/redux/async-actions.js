import { Meteor } from 'meteor/meteor';
import { addTodo, getAllTodo, removeTodo, editTodo, getMenu, findAccounts, addOrder, addOrderRemove } from './actions';
import { todosGetAll, todosAdd, todosEdit, todosRemove } from '../todos/methods';
import { menuGetAll, address } from '../menu/methods';
import { accountsFind } from '../accounts/methods';

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
    return dispatch =>
        menuGetAll.call({}, (err, result) => {
            if (err) {
                throw new Meteor.Error('error menuGetAll call');
            } else {
                dispatch(getMenu(result));
            }
        });
}

export function callFindAccount(data) {
    return dispatch =>
        accountsFind.call(data, (err, result) => {
            if (err) {
                throw new Meteor.Error(err.message);
            } else {
                dispatch(findAccounts(result));
            }
        });
}

export function callAddOrder(order) {
    return dispatch => {
        dispatch(addOrder(order));
    };
}

export function callAddOrderRemove(order) {
    return dispatch => {
        dispatch(addOrderRemove(order));
    };
}
// callAvailableAddress

export function callAvailableAddress(data) {
    console.log('asd', 'asd');
    return dispatch => {
        address();
    };
}
