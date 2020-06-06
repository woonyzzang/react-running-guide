// import React, { PureComponent } from 'react';
import React, { memo } from 'react';

// 함수형 컴포넌트 (hooks 하고는 다름)
// state 를 사용하지 않는 자식 컴포넌트는 함수형으로 만드는게 좋다.
// memo 를 사용하면 PureComponent 컴포넌트 역할을 한다.
// 함수형 컴포넌트는 PureComponent 가 아니기 때문에 PureComponent가 처럼 만들려면 React.memo 를 사용해야 한다.
const Ball = memo(({ number }) => {
    let background;

    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <div className="ball" style={{background}}>{number}</div>
    );
});

// class Ball extends PureComponent {
//     render() {
//         const { number } = this.props;
//         let background;
//
//         if (number <= 10) {
//             background = 'red';
//         } else if (number <= 20) {
//             background = 'orange';
//         } else if (number <= 30) {
//             background = 'yellow';
//         } else if (number <= 40) {
//             background = 'blue';
//         } else {
//             background = 'green';
//         }
//
//         return (
//             <div className="ball" style={{background}}>{number}</div>
//         );
//     }
// }

export default Ball;