import { Meteor } from 'meteor/meteor';
import React from 'react';
import cls from 'classnames';
import debounce from 'lodash/debounce';
import indexOf from 'lodash/indexOf';
// import { Meteor } from 'meteor/meteor';

import { connect } from 'react-redux';
import i18n from 'meteor/universe:i18n';

import Navigation from '../navigation/navigation';
import Order from '../order/order';
import MenuRow from '../menu-row/menu-row';

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
            snapType: false,
            activeIndex: 0,
            anchors: ['#salads', '#snacks', '#pizza', '#pasta', '#hotDishes', '#soups']
        };

        if (Meteor.isClient) {
            if (window.location.hash) {
                this.state.activeIndex = indexOf(this.state.anchors, window.location.hash);
            }

            if ('scroll-snap-type' in document.body.style) {
                this.state.snapType = true;
            }
        }
    }

    handlerOrder = orderItem => this.setState({ stateOrder: true, orderItem });

    cancel = () => this.setState({ stateOrder: false });

    setAnchor = activeIndex => {
        const anchors = this.state.anchors;
        window.location.hash = anchors[activeIndex] || anchors[0];
    };

    startScroll = () => {
        if (this.state.nodeWidth && !this.state.scroll) {
            this.setState({ scroll: 1 });
        }
    };

    endScroll = e => {
        if (this.state.nodeWidth) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / this.state.nodeWidth);
            const newState = { activeIndex, scroll: 0 };

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

    getIndex = () => {
        if (Meteor.isClient && window.location.hash && this.state.activeIndex === 0) {
            return indexOf(this.state.anchors, window.location.hash);
        }

        return this.state.activeIndex;
    };

    render() {
        const activeIndex = this.getIndex();
        return (
            <section className="">
                <Navigation activeIndex={activeIndex} location={this.props.location} />
                <div
                    className={cls(
                        'menu_list',
                        { 'menu_list--scrolled': this.state.scroll === 1 },
                        { 'menu_list--snap': this.state.snapType }
                    )}
                    ref={this.paneDidMount}
                >
                    {menuStub.map((item, index) => (
                        <div
                            key={index}
                            id={item.key}
                            className={cls('list', {
                                list__active: index === this.getIndex()
                            })}
                        >
                            <div className={cls('list__box', 'brake')}>
                                {item.list.map((subItem, i) => (
                                    <MenuRow
                                        key={i}
                                        name={subItem.name}
                                        name_2={subItem.name_2}
                                        price={subItem.price}
                                    />
                                ))}
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
