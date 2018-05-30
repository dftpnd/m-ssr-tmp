import { combineReducers } from 'redux';
import filter from 'lodash/filter';

import {
    ADD_TODO,
    REMOVE_TODO,
    EDIT_TODO,
    GET_ALL_TODO,
    GET_MENU,
    FIND_ACCOUNT,
    ADD_ORDER,
    ADD_ORDER_REMOVE
} from './actions';

const remove = (state, action) => {
    const elemToRemoveArray = state.slice().filter(item => item._id === action._id);
    if (Array.isArray(elemToRemoveArray)) {
        const elemToRemoveIndex = state.indexOf(elemToRemoveArray[0]);
        return [...state.slice(0, elemToRemoveIndex), ...state.slice(elemToRemoveIndex + 1)];
    }
    return state;
};

const edit = (state, action) => {
    const elemToEditArray = state.slice().filter(item => item._id === action._id);
    if (Array.isArray(elemToEditArray)) {
        const elemToEditIndex = state.indexOf(elemToEditArray[0]);
        const newState = state.slice();
        newState[elemToEditIndex].finished = !newState[elemToEditIndex].finished;
        return newState;
    }
    return state;
};

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.data]);
        case REMOVE_TODO:
            return remove(state, action);
        case EDIT_TODO:
            return edit(state, action);
        case GET_ALL_TODO:
            return action.data;
        default:
            return state;
    }
}

function menu(state = [], action) {
    switch (action.type) {
        case GET_MENU:
            return action.data;
        default:
            return state;
    }
}

function accounts(state = [], action) {
    switch (action.type) {
        case FIND_ACCOUNT:
            return action.data;
        default:
            return state;
    }
}

function orders(state = [], action) {
    const METHODS = {
        [ADD_ORDER]: () => [...state, action.data],
        [ADD_ORDER_REMOVE]: () => {
            let removeOnlyOne = false;
            return filter(state, item => {
                if (item.dish === action.data.dish && !removeOnlyOne) {
                    removeOnlyOne = true;
                    return false;
                }
                return true;
            });
        }
    };

    return (Object.prototype.hasOwnProperty.call(METHODS, action.type) && METHODS[action.type]()) || state;
}

const mainReducer = combineReducers({
    todos,
    menu,
    accounts,
    orders
});

export default mainReducer;
