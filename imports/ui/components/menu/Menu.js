import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { callGetMenu } from '../../../api/redux/async-actions';

const Menu = ({ menu, fetch }) => {
    fetch();

    return (
        <div className="menu">
            {menu.map((item, index) => <div key={index}>{item.name}</div>)}
            <a>мудак</a>
        </div>
    );
};

Menu.propTypes = {
    menu: array.isRequired,
    fetch: func.isRequired
};

const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu })(Menu);
