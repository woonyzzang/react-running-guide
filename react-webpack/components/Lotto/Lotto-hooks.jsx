// useMemo 는 함수 리턴 '값'을 캐싱(메모리에 기억) 한다. (저장)
// useCallback 은 '함수' 자체를 기억 한다. (저장)
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

// hooks 특성상 리렌더링 시 함수 전체를 다시 실행함.
// getWinNumbers 의 로또부분 미리 저장해야함, memo
// useCallback 은 함수자체를 기억.
// useMemo는 값을 기억. 필수로 적용해야할 때, 자식컴포넌트에 함수넘길때는 반드시 해야함.
// 배열이 바뀌면 새로 다시 시작함.
// componentDidUpdate안에 if로 분기처리하면 useEffect도 분기처리된 수만큼 나눠서 처리해야함.

// 다음 두 코드는 완벽히 똑같은 코드입니다.
// useCallback 은 결국 useMemo 에서 함수를 반환하는 상황에서 더 편하게 사용 할 수 있는 Hook 입니다.
// 숫자, 문자열, 객체 처럼 일반 값을 재사용하기 위해서는 useMemo 를, 그리고 함수를 재사용 하기 위해서는 useCallback 을 사용하세요
/*
useCallback(() => {
    console.log('hello world!');
}, []);

useMemo(() => {
    const fn = () => {
        console.log('hello world!');
    };
    return fn;
}, []);
*/

//숫자 미리뽑기
function getWinNumbers() {
    console.log('getWinNumbers');

    const candidate = Array(45).fill(0).map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c ) => p - c);

    return [...winNumbers, bonusNumber];
}

// hooks 컴포넌트의 동작 원리는 hooks 함수를 전체 렌더링 하기 때문에
// Class 컴포넌트와 다르게 getWinNumbers() 함수를 계속 호출하게 된다.
// 이때 useMemo 기능을 사용하면 재실행 되는 부분을 막을 수 있다.
const Lotto = () => { //훅스는 선언하는 순서가 중요함. 바꾸면 안됨. 조건문안에는 절대로 넣으면 안됨. 훅스 안에 훅스 넣으면 안댐.
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // 두번째 배열의 요소 인자값이 있으면 인자값이 바뀌지 않는 한 재실행 하지 않는다.
    const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 당첨 숫자들
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null); // 보너스 공
    const [redo, setRedo] = useState(false);
    // hooks 의 useState 값들은 조건문 안에 절대 넣으면 안되고
    // 함수나 반복문 안에도 웬만하면 넣지 않는것이 좋다.
    // hooks 는 최상위로 빼서 실행순서가 항상 같게끔 만들어 주는것이 좋다.

    const timeouts = useRef([]);

    // useEffect 안에 useSate는 절대 넣으면 안된다.
    useEffect(() => {
        // let 을 사용하면 클로져 문제가 발생되지 않는다.
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => { // 리턴값이 있으면 componentWillUnmount 와 동일
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // 2번째 인자가 빈 배열이면 componentDidMount 와 동일
    // 배열의 요소가 있으면 componentDidMount 와 componentDidUpdate 둘 다 수행
    // timeouts.current 값이 변경되면 componentDidUpdate 와 같은 기능을 한다.

    // useEffect 는 여러번 사용할 수 있다.
    // useEffect(() => {
    //     console.log('로또 숫자를 생성합니다.');
    // }, [winNumbers]);

    // useEffect(() => {
    //     // ajax
    // }, []); // 두번째 인자에 빈배열 []을 넣으면 componentDidMount 만 실행하는 패턴

    // ajax 같이 componentDidUpdate만 하고싶을때 쓰는 꼼수패턴
    // const mounted = useRef(false);
    // useEffect(() => {
    //     if (!mounted.current) {
    //         mounted.current = true;
    //     } else {
    //         // ajax
    //     }
    // }, ['바뀌는값']); // componentDidUpdate 만 실행하고 componentDidMount 에서는 동작 안하게 하는 패턴

    // onClick 이벤트를 useCallback 을 만들면 뭐가 좋으냐면
    // onClick hooks가 전체 렌더링을 다시 할 경우 이벤트 함수를 다시 만들지 않는다.
    // 두번째 인자 배열에 요소들이 없을 시 (빈 배열 []) 처음 기억해둔 함수를 끝까지 쓰는 것이다.
    // 자식 컴포넌트에 함수를 넘길때는 useCallback 은 필수로 해야 한다.
    // (부모 컴포넌트가 변경된 줄 알고 자식 컴포넌트도 같이 계속 리렌더링 되기 때문)
    const onClickRedo = useCallback(() => {
        console.log(winNumbers); // useCallback 은 첫번째 state 만 기억한다.
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeouts.current = [];
    }, [winNumbers]); // 2번째 인자 배열값이 있어야 state 변경이 갱신된다. (첫번째 state 만 기억하는 문제 해결)

    const runTimeouts = () => {
        console.log('runTimeouts');

        // let 을 사용하면 클로져 문제가 발생되지 않는다.
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
    };

    // componentDidMount() {
    //     console.log('didMount');
    //     this.runTimeouts();
    // };
    //
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('didUpdate');
    //     if (this.state.winBalls.length === 0) {
    //         this.runTimeouts();
    //     }
    // }
    //
    // componentWillUnmount() {
    //     console.log('WillUnmount');
    //     this.timeouts.forEach((v) => {
    //         clearTimeout(v);
    //     });
    // }

    return (
        <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button type="button" onClick={onClickRedo}>한번 더!</button>}
        </>
    );
};

export default Lotto;