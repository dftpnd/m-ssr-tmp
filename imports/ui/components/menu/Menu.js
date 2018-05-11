import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { callGetMenu } from '../../../api/redux/async-actions';
import menu from './menu-mock';

const Menu = ({ fetch }) => {
    fetch();
    const handlerOrder = name => {
        console.log(name);
    };
    return (
        <section className="main_menu">
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
                                    <button onClick={handlerOrder(subItem.name)}>Заказать</button>
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
    menu: array.isRequired,
    fetch: func.isRequired
};

const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu })(Menu);
