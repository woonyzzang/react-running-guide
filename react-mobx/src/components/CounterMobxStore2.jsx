import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// inject 로 컴포넌트에 스토어 주입
// inject 함수는 mobx-react 에 있는 함수로서, 컴포넌트에서 스토어에 접근할 수 있게 해줍니다.
// 정확히는, 스토어에 있는 값을 컴포넌트의 props 로 "주입"을 해줍니다.
// inject('스토어이름') 을 하시면 컴포넌트에서 해당 스토어를 props 로 전달받아서 사용 할 수 있게 됩니다.

// **** 함수형태로 파라미터를 전달해주면 특정 값만 받아올 수 있음.
@inject(stores => ({
    number: stores.store.number,
    increase: stores.store.increase,
    decrease: stores.store.decrease,
}))
@observer
class CounterMobxStore extends Component {
    render() {
        const { number, increase, decrease } = this.props;

        return (
            <div>
                <h1>React MobX Store 적용2 카운터</h1>
                <h2>{number}</h2>
                <button onClick={increase}>+1</button>
                <button onClick={decrease}>-1</button>
            </div>
        );
    }
}

export default CounterMobxStore;