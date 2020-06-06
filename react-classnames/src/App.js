import React, { Component } from 'react';

import classNames from 'classnames/bind';
import styles from './App.css';

const cx = classNames.bind(styles);

class App extends Component {
    state = {
        isActive: false
    };

    toggleBox = () => {
        this.setState({
              isActive: !this.state.isActive
        });
    };

    render() {
        const {isActive} = this.state;

        return (
            <div className="App">
                <div className={cx('box', {active: isActive})}>
                    <p>I'm the Box</p>
                </div>

                <button type="button" onClick={this.toggleBox}>button</button>
            </div>
        );
    }
}

export default App;
