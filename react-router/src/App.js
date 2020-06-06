import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, About } from './pages';
import Menu from './components/Menu';

const App = () => {
    return (
        <div>
            <h1>리액트 라우터</h1>
            <Menu />

            <Route exact path="/" component={Home} />
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/about/:name?" component={About} />
            </Switch>
        </div>
    );
};

export default App;
