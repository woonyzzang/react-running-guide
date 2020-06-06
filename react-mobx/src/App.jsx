import React, { Component } from 'react';

import Counter from './components/Counter';
import CounterMobx from './components/CounterMobx';
import CounterMobxDecorator from './components/CounterMobxDecorator';
import CounterMobxStore from './components/CounterMobxStore';
import CounterMobxStore2 from './components/CounterMobxStore2';
import CounterMobxStoreHooks from './components/CounterMobxStoreHooks';

const App = () => {
    return (
        <>
            {/* 기본 카운터 예제 */}
            <Counter />
            <hr/>

            {/* MobX 적용 카운터 예제 */}
            <CounterMobx />
            <hr/>

            {/* MobX 데코레이터 적용 카운터 예제 */}
            <CounterMobxDecorator />
            <hr/>

            {/* MobX Store 적용 카운터 예제 */}
            <CounterMobxStore />
            <hr/>

            {/* MobX Store 적용2 카운터 예제 */}
            <CounterMobxStore2 />
            <hr />

            {/* MobX Store Hooks 적용 카운터 예제 */}
            <CounterMobxStoreHooks />
        </>
    );
};

export default App;
