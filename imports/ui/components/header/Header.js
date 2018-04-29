import React from 'react';
import { connect } from 'react-redux';

const Header = () => (
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

Header.propTypes = {};
Header.defaultProps = {};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
