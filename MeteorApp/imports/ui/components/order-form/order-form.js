/* global ymaps */

import React from 'react';
import { array } from 'prop-types';
import { func } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
// const T = i18n.createComponent();
let myMap;
const ymapsInit = () => {
    myMap = new ymaps.Map('map', {
        center: [55.74, 48.74],
        zoom: 10,
        controls: []
    });

    myMap.behaviors.disable('dblClickZoom');
    myMap.behaviors.disable('scrollZoom');

    const myCircle = new ymaps.Circle(
        [[55.74, 48.74], 7000],
        {
            balloonContent: 'Радиус круга - 10 км',
            hintContent: 'Область доставки'
        },
        {
            draggable: false,
            fillColor: '#00FF0088',
            strokeColor: '#fff',
            strokeOpacity: 0.8,
            strokeWidth: 5
        }
    );

    myMap.geoObjects.add(myCircle);
};

function ContainsPoly(CoordX, CoordY) {
    const myCircle = new ymaps.Circle(
        [[55.74786, 48.742515], 7000],
        {
            balloonContent: 'Радиус круга - 10 км',
            hintContent: 'Подвинь меня'
        },
        {
            draggable: false,
            fillColor: '#DB709377',
            strokeColor: '#990066',
            strokeOpacity: 0.8,
            strokeWidth: 5
        }
    );

    myCircle.options.setParent(myMap.options);

    myCircle.geometry.setMap(myMap);

    const ContainsPoint = myCircle.geometry.contains([CoordX, CoordY]);

    return ContainsPoint;
    console.log('ContainsPoint', ContainsPoint);
}

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            delivery: 'pickup',
            pay: 'checkout',
            address: '',
            addresses: [],
            pos: [],
            loadPos: false,
            comment: '',
            available: false
        };
    }

    componentDidMount = () => {
        ymaps.ready(ymapsInit);
    };

    handlePhone = event => {
        this.setState({ phone: event.target.value });
    };

    handleDelivery = event => {
        const delivery = event.target.value;
        const pay = 'checkout';

        this.setState({ delivery, pay });
    };

    handlePay = event => {
        this.setState({ pay: event.target.value });
    };

    handleAddress = event => {
        const address = event.target.value;
        this.setState({ address });

        ymaps.suggest(address).then(addresses => this.setState({ addresses }));
    };

    checkoutLabelText = () => {
        if (this.state.delivery === 'courier') return 'Курьеру';

        return 'На кассе';
    };

    handleСomment = event => {
        const comment = event.target.value;
        this.setState({ comment });
    };

    setExistAddress = address => {
        this.setState({ address: address.displayName, addresses: [], loadPos: true });

        Meteor.call('getGeo', address.displayName, (error, res) => {
            const content = JSON.parse(res.content);
            const pos = content.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
            const splitPos = pos.split(' ');
            const available = ContainsPoly(splitPos[1], splitPos[0]);

            this.setState({ pos: [splitPos[1], splitPos[0]], loadPos: false, available });
        });
    };

    handleOrder = event => {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            // form is invalid! so we do nothing
            alert('bad!');
            return;
        }
        this.setState({ validForm: true });

        const data = new FormData(event.target);

        const message = `Зказ:
        ${this.props.orders.map(order => order.dish)};
        телефон: ${this.state.phone};
        delivery: ${this.state.delivery};
        pay: ${this.state.pay};
        address: ${this.state.address};
        comment: ${this.state.comment};
        available: ${this.state.available};`;

        // console.log('event', event);

        // сохрани заказ в сторе
        // редюсер стора сохраняет в бд
        //
        // верни номер заказа из базы
        // сгенрь ссылку чека
        // перейди на ссылку чека
        // отправь уведомление в телегу

        Meteor.call('telegramSend', message, (error, res) => {
            console.log('res', res);
        });
    };

    render() {
        return (
            <form autoComplete="on" noValidate className="order-form" onSubmit={this.handleOrder}>
                <fieldset>
                    <legend>Номер телефона</legend>
                    <label className="order-form__label" htmlFor="phone">
                        <span className="order-form__title">Введите номер телефона в удобном формате</span>
                        <div className="order-form__hint">Для отправки статуса заказа</div>
                    </label>
                    <input
                        className="order-form__field"
                        value={this.state.phone}
                        onChange={this.handlePhone}
                        id="phone"
                        type="tel"
                        placeholder="89376153020"
                        size="20"
                        minLength="9"
                        maxLength="11"
                        required
                    />
                </fieldset>
                <fieldset>
                    <legend>Доставка</legend>
                    <div id="map" className="order-form__map" style={{ height: 170, width: '100%' }} />
                    <div className="order-form__radio">
                        <div className="order-form__box">
                            <input
                                onChange={this.handleDelivery}
                                checked={this.state.delivery === 'pickup'}
                                value="pickup"
                                id="pickup"
                                type="radio"
                                name="delivery"
                                tabIndex="0"
                            />
                        </div>
                        <label htmlFor="pickup" className="order-form__label">
                            <span className="order-form__title">Заберу сам</span>
                            <div className="order-form__hint">г.Иннополис спортивная 100-77</div>
                        </label>
                    </div>
                    <div className="order-form__radio">
                        <div className="order-form__box">
                            <input
                                onChange={this.handleDelivery}
                                checked={this.state.delivery === 'courier'}
                                value="courier"
                                id="courier"
                                type="radio"
                                name="delivery"
                                tabIndex="0"
                            />
                        </div>
                        <label htmlFor="courier" className="order-form__label">
                            <span className="order-form__title">Курьером</span>
                            <div className="order-form__hint">Описан способ доставки курьером</div>
                        </label>
                    </div>

                    {this.state.delivery === 'courier' && (
                        <div className="order-form__address">
                            <label htmlFor="address" className="order-form__label">
                                <span className="order-form__title">Адрес доставки</span>
                                <div className="order-form__hint">Например: Иннополис спортивная 110</div>
                            </label>

                            <input
                                className="order-form__address-search"
                                onChange={this.handleAddress}
                                value={this.state.address}
                                id="address"
                                name="address"
                            />

                            {!!this.state.addresses.length && (
                                <div className="order-form__autocomlete">
                                    <label htmlFor="address" className="order-form__label">
                                        <span className="order-form__title">Выберите адрсе из списка</span>
                                    </label>
                                    {this.state.addresses.map((address, i) => (
                                        <div
                                            className="order-form__exist-address"
                                            key={i}
                                            onClick={() => this.setExistAddress(address)}
                                        >
                                            {address.displayName}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {this.state.available && (
                                <div>
                                    <label htmlFor="сomment" className="order-form__label">
                                        № квартиры (комментарий)
                                        <div className="order-form__hint">
                                            Например: 24 (домофон не работает звонить в 25)
                                        </div>
                                    </label>

                                    <textarea
                                        onChange={this.handleСomment}
                                        value={this.state.сomment}
                                        id="сomment"
                                        name="сomment"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="order-form__radio">
                        <div className="order-form__box">
                            <input
                                onChange={this.handleDelivery}
                                checked={this.state.delivery === 'book-it'}
                                value="book-it"
                                id="book-it"
                                type="radio"
                                name="delivery"
                                tabIndex="0"
                            />
                        </div>
                        <label htmlFor="book-it" className="order-form__label">
                            <span className="order-form__title">Забронировать столик</span>
                            <div className="order-form__hint">Перезвоним на ваш номер, уточним все детали</div>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Оплата</legend>
                    <div className="order-form__radio">
                        <div className="order-form__box">
                            <input
                                onChange={this.handlePay}
                                checked={this.state.pay === 'checkout'}
                                value="checkout"
                                id="checkout"
                                type="radio"
                                name="pay"
                                tabIndex="0"
                            />
                        </div>
                        <label htmlFor="checkout" className="order-form__label">
                            <span className="order-form__title">{this.checkoutLabelText()}</span>
                            <div className="order-form__hint">Наличными / картой / перевод сбербанк</div>
                        </label>
                    </div>
                    {false && (
                        <div className="order-form__radio">
                            <div className="order-form__box">
                                <input
                                    onChange={this.handlePay}
                                    checked={this.state.pay === 'online'}
                                    value="online"
                                    id="online"
                                    type="radio"
                                    name="pay"
                                    tabIndex="0"
                                />
                            </div>
                            <label htmlFor="online" className="order-form__label">
                                <span className="order-form__title">Онлайн оплата</span>
                                <div className="order-form__hint">Яндекс касса</div>
                            </label>
                        </div>
                    )}
                </fieldset>

                <div className="order-form__buttons">
                    <button type="button">Отменить</button>
                    <button type="button">Заказать</button>
                </div>
            </form>
        );
    }
}

OrderForm.propTypes = {
    orders: array.isRequired
    // availableAddress: func.isRequired
};

const mapStateToProps = state => ({ orders: state.orders });

export default connect(
    mapStateToProps,
    {
        fetch: callGetMenu,
        findAccount: callFindAccount
    }
)(OrderForm);
