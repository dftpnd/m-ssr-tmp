import React from 'react';
import { connect } from 'react-redux';
import { string, func, bool } from 'prop-types';
import { callRemoveTodo, callEditTodo } from '../../../api/redux/async-actions';

const Menu = (props) => {
  const { message, todoId, dispatchCallRemoveTodo, dispatchCallEditTodo, finished } = props;
  const handleRemove = () => {
    dispatchCallRemoveTodo(todoId);
  };
  const handleEdit = () => {
    dispatchCallEditTodo(todoId);
  };
  const finishedClass = () => {
    if (finished) {
      return 'todo-item todo-finished';
    }
    return 'todo-item';
  };
  return (
    <div className="menu">
      asd
    </div>
  );
};

Menu.propTypes = {
  message: string.isRequired,
  todoId: string.isRequired,
  dispatchCallRemoveTodo: func.isRequired,
  dispatchCallEditTodo: func.isRequired,
  finished: bool,
};

Menu.defaultProps = {
  finished: false,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  dispatchCallRemoveTodo: _id => dispatch(callRemoveTodo(_id)),
  dispatchCallEditTodo: _id => dispatch(callEditTodo(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
