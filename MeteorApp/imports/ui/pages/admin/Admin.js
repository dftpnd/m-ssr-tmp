import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { array } from 'prop-types';

const Admin = props => {
    return (
        <div className="subpage">
            <Helmet>
                <title>Subpage</title>
                <meta name="description" content="This is subpage. Just Helmet SSR demo for other page" />
                <meta property="og:title" content="This is subpage. Just Helmet SSR demo for OG" />
            </Helmet>
            asd
        </div>
    );
};

Admin.propTypes = {
    testData: array
};

Admin.defaultProps = {
    testData: array
};

const mapStateToProps = state => ({
    testData: ['Lorem ipsum dolor sit amet', 'consectetur adipisicing elit', 'sed do eiusmod tempor incididunt']
});

export default connect(mapStateToProps, {})(Admin);
