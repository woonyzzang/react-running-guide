import React, { Component } from 'react';
import Ball from './Ball';

// 숫자 미리뽑기
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

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false
    };

    timeouts = []; // 비동기 관리할때 변수만들어서 담으면됨.

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), //당첨숫자
            winBalls: [],
            bonus: null, //보너스공
            redo: false
        });

        this.timeouts = [];
    };

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;

        // let 을 사용하면 클로져 문제가 발생되지 않는다.
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]]
                    };
                });
            }, (i + 1) * 1000);
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true // 한번더 뽑을래?
            });
        }, 7000);
    };

    componentDidMount() {
        console.log('didMount 로드');
        this.runTimeouts();
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate 리랜더링');
        // if (this.state.timeouts.length === 0) {
        if (this.state.winBalls.length === 0) {
            this.runTimeouts();
        }

        // if (prevProps.winNumbers !== this.state.winNumbers) {
        //     console.log('로또 숫자를 생성합니다.');
        // }
    }

    componentWillUnmount() {
        console.log('WillUnmount');
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    render() {
        const { winBalls, bonus, redo } = this.state;

        return (
            <>
                <div>당첨 숫자</div>
                <div id="result">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button type="button" onClick={this.onClickRedo}>한번 더!</button>}
            </>
        );
    }
}

export default Lotto;