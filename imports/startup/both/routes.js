import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../../ui/layouts/main/Main';
import Index from '../../ui/pages/index/Index';
import Subpage from '../../ui/pages/subpage/Subpage';

export default (
    <Main>
        <Route exact path="/" component={Index} />
        <Route exact path="/subpage" component={Subpage} />
    </Main>
);
