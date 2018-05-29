import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/header/header';
import Menu from '../../components/menu/menu';

const Index = () => (
    <div className="wrapper">
        <div className="index">
            <Helmet>
                <title>Качо э Вино ресторан</title>
                <meta name="description" content="Меню заказа Качо э Вино" />
                <meta property="og:title" content="Качо э Вино" />
            </Helmet>
            <Header />
            <Menu location={this.location} />
        </div>
    </div>
);

Index.propTypes = {};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
    dispatchCallAddTodo: () => dispatch(() => {})
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
