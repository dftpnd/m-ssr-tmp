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
                <div className="nav__scroll">
                    {menuStub.map((item, index) => (
                        <a
                            href={`#${item.key}`}
                            className={cls('headmenu', { headmenu__active: index === props.activeIndex })}
                            key={index}
                        >
                            <T>{item.title}</T>
                        </a>
                    ))}
                </div>
                <div className="pn-Advancer pn-Advancer_Left">
                    <svg xmlns="http://www.w3.org/2000/svg" className="pn-Advancer_Icon" viewBox="0 0 551 1024">
                        <path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z" />
                    </svg>
                </div>
                <div className="pn-Advancer pn-Advancer_Right">
                    <svg className="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024">
                        <path d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z" />
                    </svg>
                </div>
            </section>
            <div className="nav_scroll_border" />
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
