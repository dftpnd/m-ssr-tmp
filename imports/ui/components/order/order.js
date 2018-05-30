import React from 'react';
import { number } from 'prop-types';
import cls from 'classnames';

import { connect } from 'react-redux';
import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';

const T = i18n.createComponent();

i18n.setLocale('ru-RU');

const Order = () => {
    return (
        <div className="order">
            <div className={cls('order__block', 'brake')}>
                <div className="order__box">
                    <h2>asda</h2>
                </div>
                <div className="order__button">
                    <button onClick={this.cancel}>Отменить</button>
                    <button>Оформить заказ</button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Order);
