import React from 'react';
import { number } from 'prop-types';
import cls from 'classnames';

import { connect } from 'react-redux';
import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menuStub from '../menu/menu-mock';

const T = i18n.createComponent();

const Navigation = props => {
    return (
        <nav className="nav">
            <section className={cls('nav__menu', 'brake')}>
                {menuStub.map((item, index) => (
                    <a
                        href={`#${item.key}`}
                        className={cls('headmenu', { headmenu__active: index === props.activeIndex })}
                        key={index}
                    >
                        <T>{item.title}</T>
                    </a>
                ))}
            </section>
        </nav>
    );
};

Navigation.propTypes = {
    activeIndex: number.isRequired
};

Navigation.defaultProps = {
    activeIndex: 0
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Navigation);
