import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';

const Index = () => (
    <div className="wrapper">
        <div className="index">
            <Helmet>
                <title>Index</title>
                <meta name="description" content="This is homepage. Just Helmet SSR demo" />
                <meta property="og:title" content="This is homepage. Just Helmet SSR demo for OG" />
            </Helmet>
            <Header />
            <Menu />
        </div>
    </div>
);

Index.propTypes = {};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    dispatchCallAddTodo: data => dispatch(() => {})
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
