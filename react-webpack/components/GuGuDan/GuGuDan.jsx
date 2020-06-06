const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    // Hooks는 비구조화 할당 문법으로 사용
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null); // ref

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (parseInt(value, 10) === first * second) {
            // Hooks의 경우 setState가 일어나면 set이 모여진 곳은 한번만 렌더링 된다.
            // 다행이 이부분은 리액트가 알아서 모아서 처리 함.
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            setResult(`${value} 정답 입니다.`);
            // 클래스 컴포넌트의 seState() 콜백함수 패턴도 사용가능
            // setResult((prevResult) => {
            //     return `${value} 정답 입니다.`;
            // });

            inputRef.current.focus(); // ref 속성으로 선언된 inputRef.current 엘리먼트에 접근
        } else {
            setValue('');
            setResult('오답 입니다.');

            inputRef.current.focus(); // ref 속성으로 선언된 inputRef.current 엘리먼트에 접근
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    // Hooks는 state가 변경 될 때 마다 함수 자체 즉, 전체적으로 리렌더링 된다.
    // 클래스 컴포넌트는 render 부분만 리렌더링 되는것에 비해 Hooks는 클래스 안에 함수도 재생성/재실행 되므로,
    // 기본적으로는 클래스형 컴포넌트보다 성능이 느릴 수 있다.
    console.log('렌더링');

    return (
        <>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSubmitForm}>
                <input type="number" ref={inputRef} value={value} onChange={onChangeInput} />
                <button type="submit">입력</button>
            </form>
            <div>{result}</div>
        </>
    );
};

// node의 module 시스템
module.exports = GuGuDan;