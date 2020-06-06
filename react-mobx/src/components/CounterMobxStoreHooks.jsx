import React from 'react';
import { useObserver, observer } from 'mobx-react';
import StoreHelper from '../stores/StoreHelper';

// @inject
function useUserData() {
    const {store} = StoreHelper();

    // Global Store에서 지정한 특정 Store만 Inject 합니다.
    return useObserver(() => ({
        number: store.number,
        increase: store.increase,
        decrease: store.decrease
    }));
}

// @observer
const Counter = observer(() => {
    const {number, increase, decrease} = useUserData();

    return (
        <div>
            <h1>React MobX Hooks 적용 카운터</h1>
            <h2>{number}</h2>
            <button onClick={increase}>+1</button>
            <button onClick={decrease}>-1</button>
        </div>
    )
});

export default Counter;