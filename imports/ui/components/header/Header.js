import React from 'react';
import { connect } from 'react-redux';
import { string, func, bool } from 'prop-types';
import { callRemoveTodo, callEditTodo } from '../../../api/redux/async-actions';

const Header = (props) => {
  return (
    <header className="header">
      <nav className="nav">
        <a href="">Комбо & 1 обед</a>
        <a href="">PIZZA</a>
        <a href="">Паста</a>
        <a href="">Горячии блюда</a>
        <a href="">Салаты и закуски</a>
        <a href="">Супы</a>
        <a href="">Десерты</a>
        <a href="">Напитки</a>
      </nav>
    </header>
  );
};

Header.propTypes = {
  message: string.isRequired,
  todoId: string.isRequired,
  dispatchCallRemoveTodo: func.isRequired,
  dispatchCallEditTodo: func.isRequired,
  finished: bool,
};

Header.defaultProps = {
  finished: false,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  dispatchCallRemoveTodo: _id => dispatch(callRemoveTodo(_id)),
  dispatchCallEditTodo: _id => dispatch(callEditTodo(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
