import React from 'react';
import { connect } from 'react-redux';
import cls from 'classnames';

import Accounts from '../../components/accounts';
import Lang from '../../components/lang/lang';

const Header = () => (
    <header className="header">
        <div className={cls('header__box', 'brake')}>
            <div className="header_wrapper">
                <div className="header_icon">
                    <img src="cacio_icon_2.jpg" alt="Cacio_e_vino" />
                </div>
                <div className="header__info">
                    <Lang />
                    <a href="#" className="header_number">
                        +7 912 199 23 39
                    </a>
                </div>
                {/* <Accounts /> */}
            </div>
        </div>
    </header>
);

Header.propTypes = {};
Header.defaultProps = {};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
