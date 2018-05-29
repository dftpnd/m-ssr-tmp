import React from 'react';
import { connect } from 'react-redux';
import { element, oneOfType, arrayOf, object } from 'prop-types';

class Main extends React.Component {
    getChildContext() {
        return {
            location: this.props.location
        };
    }

    render() {
        return this.props.children;
    }
}

Main.childContextTypes = {
    location: object
};
Main.propTypes = {
    children: oneOfType([arrayOf(element), object]).isRequired
};

export default connect()(Main);
