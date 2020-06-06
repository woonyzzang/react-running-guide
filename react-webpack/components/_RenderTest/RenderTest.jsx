import React, { Component } from 'react';

class RenderTest extends Component {
    state = {
        counter: 0
    };

    // shouldComponentUpdate 라이프 사이클을 이용하면 원치않은 setState 렌더링이 일어나지 않는다.
    // 참고로 Component -> PureComponent로 변경하면 자동으로 shouldComponentUpdate 자동으로 구현한다. (RenderTest-pure.jsx 참조)
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.counter !== nextState.counter) {
            return true;
        }

        return false;
    }

    onClick = () => {
        this.setState({}); // setState 만 호출하면 렌더링이 일어난다.
    };

    render() {
        console.log('렌더링:', this.state);

        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
};

export default RenderTest;