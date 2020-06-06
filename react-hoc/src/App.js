import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { HomePage, ReportPage, Report2Page, InfiniteScrollPage } from './pages';

// const ACCOUNT = 'ADMIN';
const ACCOUNT = 'USER';

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={HomePage} />
            {
                (Object.is(ACCOUNT, 'ADMIN')) &&
                <Switch>
                    <Route path="/report" component={ReportPage} />
                </Switch>
            }
            {
                (Object.is(ACCOUNT, 'USER')) &&
                <Switch>
                    <Route path="/report" component={Report2Page} />
                </Switch>
            }
            <Route path="/scroll" component={InfiniteScrollPage} />
        </BrowserRouter>
    );
};

export default App;
