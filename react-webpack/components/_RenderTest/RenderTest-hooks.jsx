// hooks 컴포넌트에서는 PureComponent를 memo로 사용한다.
// 자식 컴포넌트에 PureComponent(class 컴포넌트에서 사용) 나 memo(hooks 컴포넌트에서 사용) 이면
// 부모컴포넌트도 PureComponent 나 memo를 적용 할 수 있다.
import React, { memo, useState } from 'react';

const RenderTest = memo(() => {
    const [counter, setCounter] = useState(0);

    const onClick = () => {
        setCounter(); // setState 만 호출하면 렌더링이 일어난다.
    };

    console.log('렌더링:', counter);

    return (
        <div>
            <button onClick={onClick}>클릭</button>
        </div>
    );
});

export default RenderTest;