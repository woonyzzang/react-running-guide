import React from 'react';

const WithReportContainer = (data) => (WrappedComponent) => {
    const {Render1, Render2} = WrappedComponent;

    console.log('data: ', data);
    console.log('## WrappedComponent: ', WrappedComponent);

    return (props) => (
        <>
            { console.log('## 컨테이너 Props: ', props) }

            <h2>Report Page<br /><small>[{data.title}]</small></h2>

            <div style={{border: '2px solid red', backgroundColor: '#eee'}}>
                <h3>동적 영역</h3>
                <Render1 {...props} test1={'테스트1'} />
                {/*<WrappedComponent {...props} test={'테스트'} />*/}
            </div>

            <h3>정적 리스트</h3>
            <ul>
                <li>검증1</li>
                <li>검증2</li>
                <li>검증3</li>
            </ul>

            {
                (Render2) &&
                <div style={{border: '2px solid red', backgroundColor: '#eee'}}>
                    <h3>동적 영역</h3>
                    <Render2 test1={'테스트2'}/>
                </div>
            }
        </>
    );
};

export default WithReportContainer;
