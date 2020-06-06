import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// inject 로 컴포넌트에 스토어 주입
// inject 함수는 mobx-react 에 있는 함수로서, 컴포넌트에서 스토어에 접근할 수 있게 해줍니다.
// 정확히는, 스토어에 있는 값을 컴포넌트의 props 로 "주입"을 해줍니다.
// inject('스토어이름') 을 하시면 컴포넌트에서 해당 스토어를 props 로 전달받아서 사용 할 수 있게 됩니다.

@inject('store')
@observer
class CounterMobxStore extends Component {
    render() {
        const { store } = this.props;

        return (
            <div>
                <h1>React MobX Store 적용 카운터</h1>
                <h2>{store.number}</h2>
                <button onClick={store.increase}>+1</button>
                <button onClick={store.decrease}>-1</button>
            </div>
        );
    }
}

export default CounterMobxStore;