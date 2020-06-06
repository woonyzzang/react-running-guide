import React, { Component } from 'react';

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

class RSP extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0
    };

    interval;

    // 이벤트 핸들러 onClick={() => this.onClickBtn('가위')}
    // onClick={this.onClickBtn('가위')} 이렇게 간편하게 적용하기 위해
    // 메서드 안에 함수를 호출하는 부분은 고차 함수로 (choice) => () => {} 만들 수 있다.
    onClickBtn = (choice) => (e) => {
        // e.preventDefault();
        const { imgCoord } = this.state;

        clearInterval(this.interval);

        const myScore = scores[choice];
        const cpuScore = scores[computerChice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            this.setState({
                result: '비겼습니다.'
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
               return {
                   result: '비겼습니다.',
                   score: prevState.score + 1
               };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1
                };
            });
        }

        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 1000);
    };

    changeHand = () => {
        const { imgCoord } = this.state;

        if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            });
        } else if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            });
        } else {
            this.setState({
                imgCoord: rspCoords.바위
            });
        }
    };

    // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 한다
    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    // 리렌더링
    // componentDidUpdate() {
    //
    // }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
    // 비동기 기능을 제거 하지 않으면 컴포넌트 제거할 시 계속 돌아가게 되므로 반드시 해제하는 코드를 기재한다.
    // 자식 컴포넌트의 경우에는 반드시 해제를 넣어줘야 메모리 누수를 방지할 수 있다.
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { result, score, imgCoord } = this.state;

        return (
            <>
                <div id="computer">{imgCoord}</div>
                <div className="btns">
                    <button type="button" onClick={this.onClickBtn('가위')}>가위</button>
                    <button type="button" onClick={this.onClickBtn('바위')}>바위</button>
                    <button type="button" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;