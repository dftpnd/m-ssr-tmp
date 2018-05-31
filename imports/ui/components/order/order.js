import React from 'react';
import { array } from 'prop-types';
import uniqBy from 'lodash/uniqBy';
// import { number } from 'prop-types';
import cls from 'classnames';

import { connect } from 'react-redux';
// import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import MenuRow from '../menu-row/menu-row';
import OrderForm from '../order-form/order-form';
// const T = i18n.createComponent();

const Order = ({ orders }) => {
    const list = uniqBy(orders, 'dish');
    return (
        <div className="order">
            <div className={cls('order__block', 'brake')}>
                <h2 className="order__title">Ваш заказ</h2>
                <div className="order__box">
                    {list.map((subItem, i) => (
                        <MenuRow
                            key={i}
                            dish={subItem.dish}
                            name={subItem.name}
                            name_2={subItem.name_2}
                            price={subItem.price}
                        />
                    ))}
                </div>
                <OrderForm />
            </div>
        </div>
    );
};

Order.propTypes = {
    orders: array.isRequired
};

const mapStateToProps = state => ({ orders: state.orders });

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Order);
