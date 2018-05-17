import React from 'react';
import { connect } from 'react-redux';
import { array, object } from 'prop-types';
import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menuStub from './menu-mock';

const T = i18n.createComponent();
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOrder: false,
            orderItem: {}
        };
        // This line is important!
        console.log('menuStub', menuStub);
    }

    handlerOrder = orderItem => {
        this.setState({ stateOrder: true, orderItem });
    };
    cancel = name => {
        this.setState({ stateOrder: false });
    };

    render() {
        return (
            <section className="main_menu">
                <T>common.navbar.Language</T>
                <div className="menu">
                    {menuStub.map((item, index) => (
                        <div className="headmenu" key={index}>
                            {item.name}
                        </div>
                    ))}
                </div>
                <div className="menu_list">
                    {menuStub.map((item, index) => (
                        <div className="list" key={index}>
                            {item.list.map((subItem, i) => {
                                return (
                                    <div className="text" key={i}>
                                        <p>
                                            {subItem.name}
                                            <br />
                                            {subItem.name_2}
                                        </p>
                                        <p>
                                            Цена: {subItem.price}
                                            <br /> {subItem.price_2}
                                        </p>
                                        <button onClick={() => this.handlerOrder(subItem)}>Заказать</button>
                                    </div>
                                );
                            })},
                        </div>
                    ))}
                </div>
                {this.state.stateOrder && (
                    <div className="order">
                        <div className="order_block">
                            <h2>{this.state.orderItem.name}</h2>
                            <h3>Сумма к оплате 300 рублей</h3>
                            <p>
                                Введите сумму: <input type="text" id="input_sum" />
                            </p>
                            <button>Оплатить</button> <br />
                            <button onClick={this.cancel}>Отмена</button>
                        </div>
                        <div className="order_form">
                            <div className="order_form_delivery">
                                <h2>Доставка</h2>
                                <input type="checkbox" value="Курьером" />
                                <input type="checkbox" value="Заберу сам(а)" />
                            </div>
                            <div className="order_form_paymen">
                                <h2>Оплата</h2>
                                <input type="radio" value="Картой" />
                                <input type="radio" value="Наличными" />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

Menu.propTypes = {
    menu: array.isRequired
};

Menu.defaultProps = {};
const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Menu);
