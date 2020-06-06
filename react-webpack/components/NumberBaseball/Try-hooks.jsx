import React, { memo, useState } from 'react'; // 함수형 컴포넌트나 hooks 컴포넌트 시 { memo } 를 사용하면 { PureComponent } 처럼 사용할 수 있다.

// 함수형 컴포넌트나 hooks 컴포넌트 사용시 인자값으로 props가 넘어온다.
/*const Try = (props) => {
    return (
        <li>
            <div>{props.tryInfo.try}</div>
            <div>{props.tryInfo.result}</div>
        </li>
    );
};*/

// props 인자값에 구조분해할당으로 처리할 수도 있다.
// 구조분해할당 문법을 사용하면 this.props 생략 가능
const Try = memo(({ tryInfo }) => {
    // return (
    //     <li>
    //         <div>{tryInfo.try}</div>
    //         <div>{tryInfo.result}</div>
    //     </li>
    // );

    // pros 값이 변경되어 한다면 반드시 부모 컴포넌트에서 변경되어야 한다. 자식 컴포넌트에서 바로 변경하는건 안된다.(리액트 원칙)
    // ex) tryInfo.try = 'hell'; // 안티패턴

    // 만약 자식 컴포넌트에서 값을 변경해야 한다면 props 를 state 를 만든 후에 연결해서 사용해야 한다.
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
        setResult('1');
    };

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div onClick={onClick}>{result}</div>
        </li>
    );
});

export default Try;

