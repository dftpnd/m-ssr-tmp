import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../../ui/layouts/main/Main';
import Index from '../../ui/pages/index/Index';
import Admin from '../../ui/pages/admin/Admin';

export default (
    <Main>
        <Route exact path="/" component={Index} />
        <Route exact path="/admin" component={Admin} />
    </Main>
);
