import React from 'react';
import { renderToString } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { object } from 'prop-types';
import { Helmet } from 'react-helmet';
import mainReducer from '../../api/redux/reducers';
import routes from '../both/routes';
import { todosGetAll } from '../../api/todos/methods';
import { getAllMenu } from '../../api/menu/methods';
import { accountsFind } from '../../api/accounts/methods';
// import { accountsFind } from '../../api/order/methods';

onPageLoad(sink => {
    const context = {};
    const todos = todosGetAll.call({});
    const menu = []; // getAllMenu.call({});
    const accounts = accountsFind.call({ email: 'lkdnvc@gmail.com' });
    // const orders = orders.call();
    const orders = [];

    const store = createStore(mainReducer, { todos, menu, accounts, orders }, applyMiddleware(thunk));

    const App = props => (
        <Provider store={store}>
            <StaticRouter location={props.location} context={context}>
                {routes}
            </StaticRouter>
        </Provider>
    );

    App.propTypes = {
        location: object.isRequired
    };

    const preloadedState = store.getState();

    sink.renderIntoElementById('app', renderToString(<App location={sink.request.url} />));

    const helmet = Helmet.renderStatic();
    sink.appendToHead(helmet.meta.toString());
    sink.appendToHead(helmet.title.toString());

    sink.appendToBody(`
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `);
});
