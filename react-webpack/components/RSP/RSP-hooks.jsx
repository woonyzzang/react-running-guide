import React, { useState, useRef, useEffect } from 'react';

// [I] 리액트 라이프 사이클 주기
// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// (setState/props 변경될 때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
// 부모가 나를 없앴을 때 -> componentWillUnmount ->  소멸

const rspCoords = {
    가위: 0,
    바위: 1,
    보: 2
};
const scores = {
    가위: 1,
    바위: 0,
    보: -1
};
const computerChice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

// hooks 컴포넌트에서는 라이프사이클 메서드가 없기에 사용할 수 없다.
// 라이프 사이클을 대체하기 위해 useEffect 를 사용해야 한다.
const RSP = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(0);
    const [score, setScore] = useState(0);

    const interval = useRef();

    // resize 이벤트나 레이아웃이 변경 되기전 감지할때 사용 할 수 있다.
    // useLayoutEffect() // 화면이 바뀌기 전에 발생되는 useLayoutEffect 라는 메서드도 있다.

    // useEffect 가 componentDidMount, componentDidUpdate, componentWillUnmount 3가지 기능을 다 가지고 있다고 보면 된다.
    // 두 번째 인수인 배열에 넣은 값 imgCoord 값이 바뀔 때 useEffect가 실행 된다.
    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1:1 대응은 아님)
        // console.log('다시 실행');
        interval.current = setInterval(changeHand, 100);

        return () => { // componentWillUnmount 역할
            // console.log('종료');
            clearInterval(interval.current);
        };
    }, [imgCoord]); // 배열에는 꼭 useEffect를 다시 실행할 값만 넣어야 한다.

    // 이벤트 핸들러 onClick={() => this.onClickBtn('가위')}
    // onClick={this.onClickBtn('가위')} 이렇게 간편하게 적용하기 위해
    // 메서드 안에 함수를 호출하는 부분은 고차 함수로 (choice) => () => {} 만들 수 있다.
    const onClickBtn = (choice) => (e) => {
        // e.preventDefault();

        clearInterval(interval.current);

        const myScore = scores[choice];
        const cpuScore = scores[computerChice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('비겼습니다.');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000);
    };

    const changeHand = () => {
        if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else {
            setImgCoord(rspCoords.바위);
        }
    };

    // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 한다
    // componentDidMount() {
    //     this.interval = setInterval(this.changeHand, 100);
    // }

    // 리렌더링
    // componentDidUpdate() {
    //
    // }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
    // 비동기 기능을 제거 하지 않으면 컴포넌트 제거할 시 계속 돌아가게 되므로 반드시 해제하는 코드를 기재한다.
    // 자식 컴포넌트의 경우에는 반드시 해제를 넣어줘야 메모리 누수를 방지할 수 있다.
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    return (
        <>
            <div id="computer">{imgCoord}</div>
            <div className="btns">
                <button type="button" onClick={onClickBtn('가위')}>가위</button>
                <button type="button" onClick={onClickBtn('바위')}>바위</button>
                <button type="button" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
};

export default RSP;