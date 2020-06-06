import React, { Component } from 'react';
import { decorate, observable, action } from 'mobx';
import { observer } from 'mobx-react';

class CounterMobx extends Component {
    number = 0;

    increase = () => {
        this.number++;
    };

    decrease = () => {
        this.number--;
    };

    render() {
        return (
            <div>
                <h1>React MobX 적용 카운터</h1>
                <h2>{this.number}</h2>
                <button onClick={this.increase}>+1</button>
                <button onClick={this.decrease}>-1</button>
            </div>
        );
    }
}

decorate(CounterMobx, {
    number: observable,
    increase: action,
    decrease: action
});

export default observer(CounterMobx);
