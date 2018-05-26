import React from 'react';
import cls from 'classnames';
import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import i18n from 'meteor/universe:i18n';

import Navigation from '../navigation/Navigation';
import Order from '../order/Order';

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

    handlerOrder = orderItem => this.setState({ stateOrder: true, orderItem });

    cancel = () => this.setState({ stateOrder: false });

    setAnchor = activeIndex => {
        const anchors = ['salads', 'snacks', 'pizza', 'pasta', 'hotDishes', 'soups'];
        const activeAnchors = anchors[activeIndex];

        window.location.hash = `#${activeAnchors}`;
    };

    startScroll = e => {
        const activeIndex = Math.round(e.srcElement.scrollLeft / this.state.nodeWidth);
        this.setState({ activeIndex, scroll: 1 });
        this.setAnchor(activeIndex);
    };

    endScroll = e => {
        if (this.state.nodeWidth) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / this.state.nodeWidth);
            const newState = { activeIndex };

            if ('scroll-snap-type' in document.body.style) {
                newState.scroll = 0;
            }

            this.setState(newState);
            this.setAnchor(activeIndex);
        }
    };

    paneDidMount = node => {
        const nodeWidth = Math.floor(node.getBoundingClientRect().width);

        this.setState({ nodeWidth });

        if (node) {
            node.addEventListener('scroll', e => this.startScroll(e));
            node.addEventListener('scroll', debounce(e => this.endScroll(e), 100));
        }
    };

    render() {
        return (
            <section className="">
                <Navigation activeIndex={this.state.activeIndex} />
                <div
                    className={cls('menu_list', { 'menu_list--scrolled': this.state.scroll === 1 })}
                    ref={this.paneDidMount}
                >
                    {menuStub.map((item, index) => (
                        <div
                            className={cls('list', { list__active: index === this.state.activeIndex })}
                            key={index}
                            id={item.key}
                        >
                            <div className={cls('list__box', 'brake')}>
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
                {this.state.stateOrder && <Order />}
            </section>
        );
    }
}

// const mapStateToProps = state => ({ menu: state.menu });
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Menu);
