import React, { useState } from 'react';
import Try from './Try-hooks';

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array= [];

    for (let i = 0; i < 4; i += 1) {
        // slice: 기존 배열은 변하지 않고, 잘려진 배열을 반환 (복사)
        // splice: 기존 배열 변하고, 잘려진 배열 반환 (참조)
        // split: ( String의 메서드 ) delimeter를 기준으로 잘라서 배열을 만든후 배열을 반환 (복사)
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];

        array.push(chosen);
    }

    return array;
}

// 함수형 컴포넌트는 클래스 컴포넌트와 달리 state가 변경되면 통째로 렌더링 되기 때문에
// const [answer, setAnswer] = useState(getNumbers()); 입력창에 값을 입력할때 마다 getNumbers() 함수가 호출된다.
// react 에서 제공하는 useMemo, useCallback, useEffect 을 사용하면 해결 할 수 있다.
const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (value === answer.join('')) { // 답을 맞췄을 경우
            setResult('홈런!');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}];
            });

            alert('게임을 다시 시작합니다!');

            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if (tries.length >= 9) { // 10번 이상 틀린 경우
                setResult(`10번 넘게 틀려서 실패! 답은 ${answerArray.join(',')} 였습니다.`);

                alert('게임을 다시 시작합니다!');

                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else { // 10번 이하일 경우
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                setTries((prevTries) => {
                    return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}];
                });
                setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                {/* <input type="text" maxLength={4} defaultValue={value} /> */}
                <input type="text" maxLength={4} value={value} onChange={onChangeInput} />
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {/* 리액트에서는 반복문을 사용할때 map() 메서드를 사용한다. */}
                {/* Vue.js 가 반복문에서는 React.js 보다 가독성이 좋다고 판단되나 if() 문 같은 경우에는 React.js 보단 Vue.js 가 가독성이 좋지 않다. */}
                {tries.map((v, i) => {
                    return (
                        // key 값에 index 자체를 넣는건 안티패턴이라 성능 최적화 문제가 발생된다고 함.. (index를 key로 쓸 경우)
                        // react에서 key를 기준으로 엔리먼트를 추가하거나 수정 삭제 판단하기 때문에 배열이 순서가 바뀌면 문제가 된다.
                        // 단, 요소가 단ㅅ순 추가만 되는 배열인 경우에는 key 값으로 index 를 써도 무관하다 (삭제 기능이 없는 경우)
                        // key가 없으면 콘솔에 에러가 난다 (필수선언)
                        // <li key={i}>{v}</li>

                        // 반복되는 부분을 별도의 컴포넌트로 빼서 관리하게 되면 가독성, 재사용성, 성능최적화일때 좋다.
                        // 컴포넌트로 값을 전달할 경우 props로 전달해야 한다.
                        // key가 없으면 콘솔에 에러가 난다 (필수선언)
                        <Try key={`${i + 1}차 시도:`} tryInfo={v} />
                    );
                })}
            </ul>
        </>
    );
};

/*
    노드 모듈 시스템에서
    module.exports = { hello: 'a' };
    exports.hello = 'a'; 는 같다.
*/

/* =[D] ES6(2015) 모듈 문법 */
// export const hello = 'hello'; // import { hello }; // 변수명만 겹치지 않으면 여러번 사용 가능
// export const bye = 'hello'; // import { bye };

// module.exports 와 호환이 되고 비슷하지만 정확히는 다른 부분이 있다
export default NumberBaseball; // import NumberBaseball; // 한번만 사용가능

/* =[D] NODE 의 모듈 common.js 문법 */
// const React = require('react');
// exports.hello = 'hello';
// module.exports = NumberBaseball;

/*
    기본적으로 Node로 webpack을 돌리는데,
    Node 에서는 ES6의 import 모듈 문법을 지원하지 않기에 에러가 발생한다.
    (Node는 common.js 모듈 문법만 지원하기 때문)
    여기서 에러가 나지 않는 이유는 babel 패키지를 설치 했기 때문
    (webpack에 들어있는 babael이 import도 require로 변환해준다.)
*/