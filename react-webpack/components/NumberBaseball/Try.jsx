import React, { PureComponent } from 'react'; // { PureComponent } 를 사용하면 렌더링이 state가 변경되지 않으면 불필요하게 렌더링이 발생도지 않는다. (성능최적화)

// 웹스톰 IDE 에디터에서 클래스명에 [Ctrl + b] 키로 연결되어 있는 파일들을 코드힌트창으로 볼 수 있다. (부모 컴포넌트 확인 가능)
/*class Try extends Component {
    render() {
        return (
            // 부모 컴포넌트에서 넘겨준 props 값을 받아서 화면에 그려줄 경우에는 this.props[부모컴포넌트 props속성 key값]으로 받는다.
            // this.props 가 있는 경우 어딘가에 부모 컴포넌트가 있다고 생각하면 된다.
            <li>
                <div>{this.props.tryInfo.try}</div>
                <div>{this.props.tryInfo.result}</div>
            </li>
        );
    }
}*/

class Try extends PureComponent {
    // pros 값이 변경되어 한다면 반드시 부모 컴포넌트에서 변경되어야 한다. 자식 컴포넌트에서 바로 변경하는건 안된다.(리액트 원칙)
    // 만약 자식 컴포넌트에서 값을 변경해야 한다면 props 를 state 를 만든 후에 연결해서 사용해야 한다.
    // state = {
    //     result: this.props.result,
    //     try: this.props.try
    // };

    render() {
        // 구조분해 할당으로 this.props를 간편하게 사용할 수 있다.
        const { tryInfo } = this.props;

        return (
            // 부모 컴포넌트에서 넘겨준 props 값을 받아서 화면에 그려줄 경우에는 this.props[부모컴포넌트 props속성 key값]으로 받는다.
            // this.props 가 있는 경우 어딘가에 부모 컴포넌트가 있다고 생각하면 된다.
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        );
    }
}

export default Try;

