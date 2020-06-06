import React from 'react';
import ReactDOM from 'react-dom/cjs/react-dom.development';

import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

// MobX에서 프로젝트에 스토어를 적용 할 때는, Redux 처럼 Provider 라는 컴포넌트를 사용합니다.
import { Provider } from 'mobx-react'; // MobX 에서 사용하는 Provider
import CounterStore from './stores/CounterStore'; // 방금 만든 스토어 불러와줍니다.

const counter = new CounterStore(); // 스토어 인스턴스를 만들고

ReactDOM.render(
    <Provider store={counter}>
        {/* Provider 에 props 로 넣어줍니다. */}
        <App />
    </Provider>,
    document.getElementById('root')
);
