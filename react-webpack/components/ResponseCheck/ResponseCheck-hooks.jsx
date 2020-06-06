import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message,setMessage]= useState('클릭해서 시작하세요.');
    const [result, setResult]= useState([]);

    // this.timeout; 으로 선언한 것과 동일 (값이 변경되어도 렌더링이 되지 않음)
    // useRef 로 선언한것은 함수형 컴포넌트의 return 안의 jsx 코드들이 다시 렌더링 되지 않는다.
    // DOM 제어나 값이 변경되지만 화면에 영향을 미치지 않을 경우 사용엔 useRef() 기능을 사용
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭.');

                // state 에 startTime 을 넣으면 렌더링이 다시 일어나기 때문에 이럴경우는 전역변수 처럼 this.startTime 으로 선언한다.
                startTime.current = new Date();

            }, Math.floor(Math.random() * 1000) + 2000); // 2~ 3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);

            setState('waiting');
            setMessage('너무 성급하시군요!. 초록색이 된 후에 클릭 하세요.');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 하세요.');
            setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return (result.length === 0)
            ? null // null 을 선언하면 태그를 그리지 않는다
            : <>
                {/* ex: 평균시간이 71ms -> 0.07초 */}
                <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>초기화</button>
            </>;
    };

    // jsx 에서는 return 으로 배열 처럼 넘길 수도 있다. (실제 사용성은 극히 떨어짐)
    // 배열처럼 사용할려면 key 값은 필수
    // return [
    //     <div key="사과">사과</div>,
    //     <div key="배">배</div>,
    //     <div key="감">감</div>,
    //     <div key="귤">귤</div>
    // ];

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>

            {/* for() 문과 if() 문은 사용 할 수는 있지만 비효율적이기 때문에 삼항연산자로 처리 */}
            {/*{(this.state.result.length === 0) ? null : <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}*/}

            {/* && (엔드) 연산자를 사용하면 삼항연산자 보단 코드를 조금 더 줄일 수 있다. */}
            {/*{(this.state.result.length !== 0) && <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}*/}

            {/* 조건문을 줘야 하는데 코드의 가독성이 떨어지게 되는 부분들은 함수로 빼서 사용할 수 있다. */}
            {renderAverage()}

            {/* 즉시 실행 함수로 for() 문과 if() 문을 사용 할 수 있다. */}
            {/*{(() => {
                if (true) {}
                for () {}
            })()}*/}
        </>
    );
}

export default ResponseCheck;