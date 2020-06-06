# React Webapck 수동
> 리액트 관련 Webpack 설치 및 사용 가이드 입니다.

## node.js 설치
[Node 설치](https://nodejs.org/ko/)

### 1. packge.json 파일 생성
``` bash
# packge.json 자동 생성됨
$ npm init -y
```

### 2. react 패키지 설치
``` bash
$ npm i -S react react-dom
```

### 3. client.jsx 파일 생성 후 코드 삽입
``` javascript
const React = requre('react');
const ReactDom = requre('react-dom');

const GuGuDan = require('./GuGuDan');

ReactDom.render(
    <GuGuDan />,
    document.querySelector('#root')
);
```

### 3. GuGuDan.jsx 파일 생성 후 코드 삽입
``` javascript
const React = require('react');
const { Component } = React;

class GuGuDan extends Component {
    state = {
        text: 'Hello, webpack'
    };

    render() {
        return (
            <h1>{this.state.text}</h1>
        );
    }
}

// node의 module 시스템
module.exports = WordRelay;
```

### 4. index.html 파일 생성
``` javascript
# 코드 기입
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>React</title>
</head>
<body>
<div id="root"></div>

<script src="./build/app.js"></script>
</body>
</html>
```

### 5. webpack 패키지 설치
``` bash
$ npm i -D webpack webpack-cli
```

### 6. webpack.config.js 파일 생성 후 코드 삽입
``` javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/build/'
    }
};
```

### 7. packge.json 파일 `scripts` 영역 `webpack` 실행 명령어 설정 코드 추가
``` json
{
    ...
    "scripts": {
        "webpack": "webpack"
    },
    ...
}
```

### 8. webpack 빌드 명령어 실행
``` bash
$ npm run webpack
```

npm 명령어로 웹팩 빌드 시 에러가 발생한다.

npx 명령어로 웹팩 빌드를 해보면 에러가 발생하나 빌드 산출물은 나온다. 빌드된 산출물 코드를 웹브라우저에서 확인시 콘솔에 에러가 표기된다.
이유는 client.jsx 파일 안에 JSX 문법으로 작성된 `<GuGuDan />` 컴포넌트 로드가 이슈이기 때문이다.

``` bash
$ npx run webpack
```

JSX 문법을 제대로 웹팩으로 번들링 하려면 `babel` 패키지를 설치해야 한다.

### 9. babel 패키지 설치
``` bash
$ npm i -D @babel/core # 바벨 기본 핵심
$ npm i -D @babel/preset-env # 웹브라우저에 맞게 알아서 최신 문법을 하위 코드로 변경
$ npm i -D @babel/preset-react # JSX 지원 
$ npm i -D babel-loader # 바벨과 웹팩을 연결
$ npm i -D @babel/plugin-proposal-class-properties # React 클래스 안에 state = {}; 속성 문법 사용 가능하게 지원
```

### 10. webapck.config.js 파일 바벨 관련 모듈 코드 추가
``` javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    }
    ...
};
```

### 11. webpack 빌드 명령어 실행
``` bash
$ npm run webpack
```

- - -

### 12. webpack-dev-server 패키지 설치
``` bash
$ npm i -D react-hot-loader  # 로컬 서버 자동 갱신
$ npm i -D webpack-dev-server # 웹팩 로컬 서버용
```

### 13. packge.json 파일 `scripts` 영역 `webpack-dev-server` 실행 명령어 뒤에 `webpack-dev-server --hot` 옵션 설정 코드 추가
`react-hot-loader` 를 설치해야 `--hot` 옵션을 사용할 수 있다.
``` json
{
    ...
    "scripts": {
        "webpack": "webpack",
        "webpack-dev-server": "webpack-dev-server --hot"
    },
    ...
}
```