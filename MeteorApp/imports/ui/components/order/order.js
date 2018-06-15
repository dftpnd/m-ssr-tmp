import React from 'react';
import { array } from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import cls from 'classnames';
import { connect } from 'react-redux';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import MenuRow from '../menu-row/menu-row';
import OrderForm from '../order-form/order-form';

const Order = ({ orders }) => {
    const list = uniqBy(orders, 'dish');
    const summList = map(orders, item => item.price);
    const summ = reduce(summList, (sum, n) => sum + n);

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
                <h3 className="order__result">Итог:&nbsp;{summ}&ensp;₽</h3>
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
