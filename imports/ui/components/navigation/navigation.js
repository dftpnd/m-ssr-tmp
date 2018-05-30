import { Meteor } from 'meteor/meteor';
import React from 'react';
import { array, number } from 'prop-types';
import cls from 'classnames';
import { connect } from 'react-redux';
import i18n from 'meteor/universe:i18n';
import indexOf from 'lodash/indexOf';

import { callGetMenu, callFindAccount } from '../../../api/redux/async-actions';
import menuStub from '../menu/menu-mock';

const T = i18n.createComponent();

const active = (index, activeIndex) => {
    if (Meteor.isServer) {
        return null;
    }

    return { headmenu__active: index === activeIndex };
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.navLink = React.createRef();
        this.links = [];

        menuStub.forEach(() => this.links.push(React.createRef()));
    }
    componentDidMount = () => {
        this.links[this.props.activeIndex].current.className += ' headmenu__active';
    };

    render() {
        return (
            <nav className="nav" ref={this.navLink}>
                <section className={cls('nav__menu', 'brake')}>
                    <div className="nav__scroll">
                        {menuStub.map((item, index) => (
                            <a
                                href={`#${item.key}`}
                                ref={this.links[index]}
                                className={cls('headmenu', active(index, this.props.activeIndex))}
                                key={index}
                            >
                                <T>{item.title}</T>
                            </a>
                        ))}
                    </div>
                </section>
                <div className="nav_scroll_border" />
            </nav>
        );
    }
}

Navigation.propTypes = {
    activeIndex: number,
    anchors: array
    // orders: array.isRequired
};

Navigation.defaultProps = {
    activeIndex: 0
};

const mapStateToProps = state => ({ orders: state.orders });

export default connect(mapStateToProps, { fetch: callGetMenu, findAccount: callFindAccount })(Navigation);
