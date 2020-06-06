import React, { Component } from 'react';

class Counter extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     // this.increase = this.increase.bind(this);
    // }

    // increase = this.increase.bind(this);

    number = 0;

    // increase() {
    //     this.setState({
    //         number: this.number++
    //     });
    // };

    increase = () => {
        this.setState({
            number: this.number++
        });
    };

    decrease = () => {
        this.setState({
            number: this.number--
        });
    };

    render() {
        return (
            <div>
                <h1>React 기본 카운터</h1>
                <h2>{this.number}</h2>
                 {/*<button onClick={this.increase.bind(this)}>+1</button>*/}
                <button onClick={this.increase}>+1</button>
                <button onClick={this.decrease}>-1</button>
            </div>
        );
    }
}

export default Counter;
