import React from 'react';

import Step1 from './step1/Step1';
import Step2 from './step2/Step2';
import Step3 from './step3/Step3';
import Step4 from './step4/Step4';

const App = () => {
    return (
        <>
            <h1>React Component State에 기초한 CSS Animation</h1>
            <Step1 />
            <hr />

            <h2>React Component State에 기초한 자바스크립트 스타일 애니메이션</h2>
            <Step2 />
            <hr />

            <h2>React-Motion 라이브러리 적용 예제1</h2>
            <Step3 />
            <hr />

            <h2>React-Motion 라이브러리 적용 예제2</h2>
            <Step4 />
            <hr />
        </>
    );
};

export default App;
