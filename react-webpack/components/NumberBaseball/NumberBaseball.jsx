import React, { Component, createRef } from 'react';
// import React, { PureComponent } from 'react'; // Component 대신 PureComponent 를 사용할 시 shouldComponentUpdate 를 알아서 구현한 것처럼 자동으로 동일하게 동작한다.
import Try from './Try';

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

// PureComponent 의 단점은 state를 감시하는데 깊은 객체, 배열, 참조 관계가 있는 복잡한 구조가 생기면 PureComponent 도 판단을 어려워 한다.
// class NumberBaseball extends  PureComponent {
class NumberBaseball extends  Component {
    // constructor(props) {
    //     // super(props) 선언전까지 constructor에서 this 키워드를 사용 할 수 없다.
    //     // 참조: https://velog.io/@honeysuckle/%EB%B2%88%EC%97%AD-Dan-Abramov-%EC%99%9C-superprops-%EB%A5%BC-%EC%9E%91%EC%84%B1%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80
    //     super(props);
    //
    //     // 화살표 함수가 아닌경우 this로 접근하려면 constructor 에 this.state 를 넣어야 한다.
    //     this.state = {
    //         result: '',
    //         value: '',
    //         answer: getNumbers(),
    //         tries: []
    //     };
    //
    //     // 화살표 함수가 아닌경우 this로 접근하려면 constructor 에 bind(this) 를 맵핑시켜야 한다.
    //     this.onSubmitForm = this.onSubmitForm.bind(this);
    // }

    // 클래스필드 문법
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1, 3, 5, 7]
        tries: [] // 리액트에서는 불변성 데이터로 관리해야 하기 때문에 push() 같은 메서드를 사용하면 안된다.
    };

    // createRef 기능을 사용하면 hooks 컴포넌트 패턴과 마찮가지로 .current로 접근해야 한다.
    inputRef = createRef();

    // 화살표 함수가 아니면 안에서 this로 접근을 못한다.
    // 화살표 함수로 만들지 않으면 constructor에 state 와 bind()를 선언해야 한다.
    // 결국 불필요한 코드들을 적용해야 하기때문에 비효율적이다.
    // constructor에 바인드를 연결을 선언 하지 않고 메서드 함수가 실행될 경우 this는 undefined 에러가 발생.
    // onSubmitForm() {
    //     console.log(this);
    //     console.log(this.state.value);
    // }

    onSubmitForm = (e) => {
        e.preventDefault();
        
        // 웹스톰 IDE 에디터에서 [Alt + j] 키로 단어 일괄로 선택 가능
        if (this.state.value === this.state.answer.join('')) { // 답을 맞췄을 경우
            // this.setState({
            //     result: '홈런!',
            //     tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}]
            // });
            // 이전 state 로 현재 state 값을 만들때 함수형으로 setState를 사용하면 좋다.
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, {try: this.state.value, result: '홈런!'}]
                };
            });

            alert('게임을 다시 시작합니다!');

            this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
            });
        } else { // 답 틀렸으면
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;

            if (this.state.tries.length >= 9) { // 10번 이상 틀린 경우
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answerArray.join(',')} 였습니다.`,
                });

                alert('게임을 다시 시작합니다!');

                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
            } else { // 10번 이하일 경우
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                // this.setState({
                //     tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}],
                //     value: ''
                // });
                // 이전 state 로 현재 state 값을 만들때 함수형으로 setState를 사용하면 좋다.
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}],
                        value: ''
                    };
                });
            }
        }

        // createRef 기능을 사용하면 hooks 컴포넌트 패턴과 마찮가지로 .current로 접근해야 한다.
        this.inputRef.current.focus();
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value
        });
    };

    // react 의 createRef 기능을 활용하면 생략할 수 있다.
    // onInputRef = (c) => {
    //     this.inputRef = c;
    // };

    // 반환값이 true 면 렌더링 하고 false 면 렌더링을 하지 않는다.
    // { PureComponent } 사용 시 알아서 자동으로 해주기 때문에 필요 없음
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.value !== nextState.value) {
    //         return true;
    //     }
    //
    //     return false;
    // }

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    {/* <input type="text" maxLength={4} defaultValue={this.state.value} /> */}
                    <input type="text" ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {/*{(() => {
                        const array = [];

                        for (let i = 0; i < tries.length; i++) {
                            array.push(<Try key={`${i + 1}차 시도:`} tryInfo={v} />);
                        }

                        return array;
                    })()}*/}
                    {/* 리액트에서는 반복문을 사용할때 map() 메서드를 사용한다. */}
                    {/* Vue.js 가 반복문에서는 React.js 보다 가독성이 좋다고 판단되나 if() 문 같은 경우에는 React.js 보단 Vue.js 가 가독성이 좋지 않다. */}
                    {this.state.tries.map((v, i) => {
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
    }
}

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