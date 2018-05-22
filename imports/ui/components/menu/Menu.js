import React from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'meteor/ostrio:cookies';
// import { array } from 'prop-types';
import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menuStub from './menu-mock';

const cookies = new Cookies();
const T = i18n.createComponent();

i18n.setLocale('ru-RU');

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOrder: false,
            orderItem: {}
        };
    }

    handlerOrder = orderItem => {
        this.setState({ stateOrder: true, orderItem });
    };
    cancel = () => {
        this.setState({ stateOrder: false });
    };

    render() {
        //const cookies = new Cookies();
        return (
            <section className="main_menu">
                <div className="menu">
                    {menuStub.map((item, index) => (
                        <div className="headmenu" key={index}>
                            <T>{item.title}</T>
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
                                            <span className="text_span">{subItem.name_2}</span>
                                        </p>
                                        <p>
                                            <b>{subItem.price}</b>
                                            <br />
                                            <span
                                                className="text_span_button"
                                                onClick={() => this.handlerOrder(subItem)}
                                            >
                                                Заказать
                                            </span>
                                        </p>
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
                        </div>
                        <div className="order_block_button">
                            <button onClick={this.cancel}>Отменить</button>
                            <button>Оформить заказ</button>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

// Menu.propTypes = {
//     menu: array.isRequired
// };

// Menu.defaultProps = {
//     menu: []
// };
// const mapStateToProps = state => ({ menu: state.menu });
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Menu);
