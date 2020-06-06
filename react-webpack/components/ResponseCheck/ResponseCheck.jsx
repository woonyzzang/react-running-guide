import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: []

    };

    // this.timeout; 으로 선언한 것과 동일 (값이 변경되어도 렌더링이 되지 않음)
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;

        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });
            
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭.'
                });

                // state 에 startTime 을 넣으면 렌더링이 다시 일어나기 때문에 이럴경우는 전역변수 처럼 this.startTime 으로 선언한다.
                this.startTime = new Date();

            }, Math.floor(Math.random() * 1000) + 2000); // 2~ 3초 랜덤
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout);

            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요!. 초록색이 된 후에 클릭 하세요.'
            });
        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 하세요.',
                    result: [...prevState.result, this.endTime - this.startTime]
                };
            });
        }
    };

    onReset = () => {
        this.setState({
            result: []
        });
    };

    // 초기화 버튼을 클릭할 때마다 id="screen" 영역이 재렌더링 되는데 이럴경우 컴포넌트를 쪼개서 PureComponent 로 만들어 주는게 좋다.
    renderAverage = () => {
        const { result } = this.state;

        return (result.length === 0)
            ? null // null 을 선언하면 태그를 그리지 않는다
            : <>
                {/* ex: 평균시간이 71ms -> 0.07초 */}
                {/* reduce 함수는 합계를 구할 경우 사용할 수 있다. */}
                <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={this.onReset}>초기화</button>
            </>;
    };

    render() {
        const { state, message } = this.state;

        return (
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClickScreen}
                >
                    {message}
                </div>

                {/* for() 문과 if() 문은 사용 할 수는 있지만 비효율적이기 때문에 삼항연산자로 처리 */}
                {/*{(this.state.result.length === 0) ? null : <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}*/}

                {/* && (엔드) 연산자를 사용하면 삼항연산자 보단 코드를 조금 더 줄일 수 있다. */}
                {/*{(this.state.result.length !== 0) && <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}*/}

                {/* 조건문을 줘야 하는데 코드의 가독성이 떨어지게 되는 부분들은 함수로 빼서 사용할 수 있다. */}
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;