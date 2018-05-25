import React from 'react';
import cls from 'classnames';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

import { connect } from 'react-redux';
// import { array } from 'prop-types';
import i18n from 'meteor/universe:i18n';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menuStub from './menu-mock';

const T = i18n.createComponent();

i18n.setLocale('ru-RU');

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeWidth: null,
            stateOrder: false,
            orderItem: {},
            activeIndex: 0
        };
    }
    reload = () => setTimeout(window.location.reload.bind(window.location), 1000);

    componentDidMount = () => {
        window.addEventListener('resize', this.reload);
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.reload);
    };

    handlerOrder = orderItem => {
        this.setState({ stateOrder: true, orderItem });
    };

    cancel = () => {
        this.setState({ stateOrder: false });
    };

    handleWindowResize = () => {
        console.log('123');
    };

    setAnchor = activeIndex => {
        const anchors = ['salads', 'snacks', 'pizza', 'pasta', 'hotDishes', 'soups'];
        const activeAnchors = anchors[activeIndex];
        console.log('activeAnchors', activeAnchors);
        window.location.hash = `#${activeAnchors}`;
    };

    startScroll = e => {
        if (this.state.nodeWidth) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / this.state.nodeWidth);
            this.setState({ activeIndex });
            this.setAnchor(activeIndex);
        }
    };

    endScroll = e => {
        if (this.state.nodeWidth) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / this.state.nodeWidth);
            this.setState({ activeIndex });
            this.setAnchor(activeIndex);
        }
    };

    endScroll = e => {
        if (this.state.nodeWidth) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / this.state.nodeWidth);
            this.setState({ activeIndex });
            this.setAnchor(activeIndex);
        }
    };

    updateNodeWidth = (e, node) => {
        console.log(e, node);
    };
    paneDidMount = node => {
        const nodeWidth = Math.floor(node.getBoundingClientRect().width);
        this.setState({ nodeWidth });

        if (node) {
            if (!('scroll-snap-type' in document.body.style)) {
                node.addEventListener('scroll', throttle(e => this.startScroll(e), 100));
            }
            node.addEventListener('scroll', debounce(e => this.endScroll(e), 100));

            node.addEventListener('resize', debounce(e => this.updateNodeWidth(e, node), 100));
        }
    };

    render() {
        return (
            <section className="main_menu">
                <h1>{this.state.activeIndex}</h1>
                <div className="menu">
                    <div className="menu_scroll">
                        <div className="menu_scroll_border" />
                        <div className="menu_scroll_block" />
                    </div>
                    {menuStub.map((item, index) => (
                        <a
                            href={`#${item.key}`}
                            className={cls('headmenu', { headmenu__active: this.state.activeIndex === index })}
                            key={index}
                        >
                            <T>{item.title}</T>
                        </a>
                    ))}
                </div>
                <div
                    className={cls('menu_list', { 'menu_list--scrolled': this.state.scroll === 0 })}
                    ref={this.paneDidMount}
                >
                    {menuStub.map((item, index) => (
                        <div className="list" key={index} id={item.key}>
                            <div className="list__box">
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
                                })}
                            </div>
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
