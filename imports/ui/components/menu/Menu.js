import React from 'react';
import { connect } from 'react-redux';
import { array, object } from 'prop-types';
import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menu from './menu-mock';

const T = i18n.createComponent();

const Menu = ({ fetch }) => {
    fetch();
    const handlerOrder = name => {
        console.log(name);
    };
    return (
        <section className="main_menu">
            <T>common.navbar.Language</T>
            <div className="menu">
                {menu.map((item, index) => (
                    <div className="headmenu" key={index}>
                        {item.name}
                    </div>
                ))}
            </div>
            <div className="menu_list">
                {menu.map((item, index) => (
                    <div className="list" key={index}>
                        {item.list.map((subItem, i) => {
                            return (
                                <div className="text" key={i}>
                                    {' '}
                                    <p>
                                        {subItem.name}
                                        <br />
                                        {subItem.name_2}
                                    </p>
                                    <p>
                                        Цена: {subItem.price}
                                        <br /> {subItem.price_2}
                                    </p>
                                    <button onClick={() => {}}>Заказать</button>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
};

Menu.propTypes = {
    menu: array.isRequired
};

Menu.defaultProps = {};
const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Menu);
