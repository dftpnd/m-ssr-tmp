import React from 'react';
import { string, func, array, number } from 'prop-types';
import { connect } from 'react-redux';
import { callAddOrder, callAddOrderRemove } from '../../../api/redux/async-actions';

const MenuRow = ({ dish, name, price, name_2, orders, handlerOrder, handlerOrderRemove }) => {
    const length = orders.filter(items => items.dish === dish).length;
    const isEmpty = !length;
    const format = () => {
        if (isEmpty) return price;
        return price * length;
    };
    return (
        <div className="menu-row" role="main">
            <div className="menu-row__content">
                <h3 className="menu-row__title">
                    <span className="menu-row__wraptitle">{name}</span>
                </h3>
                <div className="menu-row__price price">
                    {!isEmpty && (
                        <span className="price__box">
                            <span className="price__length">{length}</span>
                            <span className="price__x">&ensp;×&ensp;</span>
                            <span className="price__price">{price}</span>
                        </span>
                    )}
                    <div>{format()}&ensp;₽</div>
                </div>
            </div>
            <div className="menu-row__action">
                <p className="menu-row__text">{name_2}</p>
                <div className="menu-row__box">
                    {isEmpty && (
                        <span className="menu-row__order" onClick={() => handlerOrder({ dish, name, price, name_2 })}>
                            заказать
                        </span>
                    )}
                    {!isEmpty && (
                        <div className="menu-row__box">
                            <span className="menu-row__order" onClick={() => handlerOrderRemove({ dish })}>
                                удалить
                            </span>
                            <span
                                className="menu-row__order"
                                onClick={() => handlerOrder({ dish, name, price, name_2 })}
                            >
                                добавить
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

MenuRow.propTypes = {
    dish: string.isRequired,
    name: string.isRequired,
    name_2: string,
    price: number.isRequired,
    handlerOrder: func.isRequired,
    handlerOrderRemove: func.isRequired,
    orders: array.isRequired
};

const mapStateToProps = state => ({ orders: state.orders });

export default connect(mapStateToProps, { handlerOrder: callAddOrder, handlerOrderRemove: callAddOrderRemove })(
    MenuRow
);
