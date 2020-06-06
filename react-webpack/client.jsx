const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');
// import { hot } from 'react-hot-loader/root';

import RenderTest from './components/_RenderTest/RenderTest'; // 렌더링 테스트
import Test from './Test';

const GuGuDan = require('./components/GuGuDan/GuGuDan');
const WordReplay = require('./components/WordReplay/WordReplay');

const App = () => {
    return (
        <>
            <RenderTest />
            <hr />
            <GuGuDan />
            <WordReplay />
            <Test />
        </>
    );
} ;

const Hot = hot(App);

// JSX 문법을 지원하는 @babel/preset-react 패키지를 설치하지 않으면 webpack build 시 에러가 발생하게 된다.
ReactDom.render(
    <Hot />,
    document.querySelector('#root')
);