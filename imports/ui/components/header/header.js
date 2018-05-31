import React from 'react';
import { connect } from 'react-redux';
import cls from 'classnames';

import Accounts from '../../components/accounts';
import Lang from '../../components/lang/lang';

const Header = () => (
    <header className="header">
        <div className={cls('header__box', 'brake')}>
            <div className="header__wrapper">
                <div className="header__icon">
                    <img src="/images/cacio-e-vino.jpg" width={267} height={179} />
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
