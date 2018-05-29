import { Meteor } from 'meteor/meteor';
import React from 'react';
import { object } from 'prop-types';
import cls from 'classnames';
import debounce from 'lodash/debounce';
import indexOf from 'lodash/indexOf';
import { connect } from 'react-redux';
import i18n from 'meteor/universe:i18n';

import Navigation from '../navigation/navigation';
import Order from '../order/order';
import MenuRow from '../menu-row/menu-row';
import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menuStub from './menu-mock';

const T = i18n.createComponent();

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
    }

    componentDidMount = () => {
        window.addEventListener('hashchange', this.setActiveIndex, false);
    };

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.setActiveIndex, false);
    }

    setActiveIndex = () => {
        if (window.location.hash) {
            const activeIndex = indexOf(this.state.anchors, window.location.hash);
            if (this.state.activeIndex !== activeIndex) {
                this.setState({ activeIndex });
            }
        }
    };

    handlerOrder = orderItem => this.setState({ stateOrder: true, orderItem });

    cancel = () => this.setState({ stateOrder: false });

    setAnchor = activeIndex => {
        const anchors = this.state.anchors;
        window.location.hash = anchors[activeIndex] || anchors[0];
    };

    startScroll = (e, nodeWidth) => {
        if (nodeWidth && !this.state.scroll) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / nodeWidth);
            this.setState({ activeIndex, scroll: 1 });
        }
    };

    endScroll = (e, nodeWidth) => {
        if (nodeWidth && this.state.scroll) {
            const activeIndex = Math.round(e.srcElement.scrollLeft / nodeWidth);
            this.setState({ activeIndex, scroll: 0 });
            this.setAnchor(activeIndex);
        }
    };

    paneDidMount = node => {
        if (!('scroll-snap-type' in document.body.style)) return;
        this.setState({ snapType: true });
        const nodeWidth = Math.floor(node.getBoundingClientRect().width);

        if (node) {
            node.addEventListener('scroll', e => this.startScroll(e, nodeWidth));
            node.addEventListener('scroll', debounce(e => this.endScroll(e, nodeWidth), 100));
        }
    };

    render() {
        const activeIndex = this.state.activeIndex;

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
                                list__active: index === activeIndex
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

Menu.propTypes = {
    location: object
};

// const mapStateToProps = state => ({ menu: state.menu });
const mapStateToProps = () => ({});

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Menu);
