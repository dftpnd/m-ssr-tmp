import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Header from '../../components/header/header';
import Menu from '../../components/menu/menu';

const Index = () => (
    <div className="wrapper">
        <div className="index">
            <Helmet>
                <title>Cacio e Vino</title>
                <meta name="description" content="Меню Cacio e Vino" />
                <meta property="og:title" content="Cacio e Vinoо" />
                <meta name="robots" content="noindex" />
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
