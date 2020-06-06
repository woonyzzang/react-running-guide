import React, { PureComponent } from 'react';

class RenderTest extends PureComponent {
    state = {
        counter: 0
    };

    // shouldComponentUpdate 라이프 사이클 생략
    // PureComponent 단점은 원본 객체나 배열의 state를 변경하면 자동으로 알아채지 못할 수 있다. (불변성을 유지해야 함)
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //
    //     return false;
    // }

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