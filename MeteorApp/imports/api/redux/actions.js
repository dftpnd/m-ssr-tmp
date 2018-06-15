/*
* action types
*/

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const GET_ALL_TODO = 'GET_ALL_TODO';
export const GET_MENU = 'GET_MENU';
export const FIND_ACCOUNT = 'FIND_ACCOUNT';
export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ORDER_REMOVE = 'ADD_ORDER_REMOVE';

/*
* action creators
*/

export function addTodo(data) {
    return {
        type: ADD_TODO,
        data
    };
}

export function removeTodo(_id) {
    return {
        type: REMOVE_TODO,
        _id
    };
}

export function editTodo(_id) {
    return {
        type: EDIT_TODO,
        _id
    };
}

export function getAllTodo(data) {
    return {
        type: GET_ALL_TODO,
        data
    };
}

export function getMenu(data) {
    return {
        type: GET_MENU,
        data
    };
}

export function findAccounts(data) {
    return {
        type: FIND_ACCOUNT,
        data
    };
}

export function addOrder(data) {
    return {
        type: ADD_ORDER,
        data
    };
}

export function addOrderRemove(data) {
    return {
        type: ADD_ORDER_REMOVE,
        data
    };
}
