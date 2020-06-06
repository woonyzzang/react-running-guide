// https://webpack.js.org/concepts/

const path = require('path');
const webpack = require('webpack');

// module.exports 안에 mode 값을 실서비스인 production 으로 변경 시 주석 해제 (배포모드)
// process.env.NODE_ENV = 'production';

module.exports = {
    // name: 'wordreplay-setting', // webpack 타이틀명 (생략 가능)
    mode: 'development', // 개발: development, 실서비스: production (개발모드에서는 크롬 확장 react-dev-tools 가 빨간아이콘으로 표기되고 실서비스모드는 녹색아이콘으로 표기)
    devtool: 'eval', // 개발: eval, 실서비스: hidden-source-map
    resolve: { // entry 파일명 입력시 확장자 생략 가능하게 하는 기능
        extensions: ['.js', '.jsx']
    },

    // 입력
    entry: {
        app: ['./client']
    },

    // 출력
    output: {
        path: path.join(__dirname, 'build'), // __dirname: 현재 폴더 기준으로 root 폴더 경로 기준
        filename: 'app.js',
        publicPath: '/build/' // webpack-dev-server는 path를 인식 못하므로 publicPath를 설정 해줘야 한다. (절대경로로 넣어주어야 함)
    },

    // 입력 파일에 관한 로더관련 모듈 설정
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader', // 바벨과 웹팩을 연결
            //     options: {
            //         // [presets 정의]
            //         // @babel/preset-env: 웹브라우저에 맞게 알아서 최신 문법을 하위 코드로 변경
            //         // @babel/preset-react: JSX 지원
            //         presets: ['@babel/preset-env', '@babel/preset-react'], // 플로그인들의 모음 (상위 개념)
            //
            //         // [plugins 정의]
            //         // @babel/plugin-proposal-class-properties: React 클래스 안에 state = {}; 속성 문법 사용 가능하게 지원
            //         plugins: ['@babel/plugin-proposal-class-properties'] // Hooks 컴포넌트 사용시 필요없음
            //     }
            // },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader', // 바벨과 웹팩을 연결
                options: {
                    // [바벨 presets 정의]
                    // @babel/preset-env: 웹브라우저에 맞게 알아서 최신 문법을 하위 코드로 변경
                    // @babel/preset-react: JSX 지원
                    presets: [
                        ['@babel/preset-env', { // 플러그인들의 모임이기때문에 preset-env 안의 상세 옵션도 줄 수 있다
                            targets: {
                                // https://github.com/browserslist/browserslist
                                browsers: [
                                    '> 5% in KR', // 한국에서 브라우저 점유율이 5% 이상인 브라우저 대응
                                    // 'last 2 chrome versions', // 마지막 크롬버전 기준으로 하위 버전 1개까지 호환 (예: 크롬 최신이 70 이라면 69~70 버전까지 대응)
                                    // '> 1%', // 전세계 브라우저 점유율 1%대 이상 기준으로 대응
                                    // 'not dead', // 아직 죽지않은 브라우저 기준 대응
                                ]
                            },
                            debug: true // debug 옵션을 활성화 하고 웹팩 명령어를 실행하면 콘솔에 브라우저 하위 대응 범위 관련 로그 정보가 찍힌다
                        }],
                        '@babel/preset-react'
                    ],

                    // [바벨 plugins 정의]
                    // @babel/plugin-proposal-class-properties: React 클래스 안에 state = {}; 속성 문법 사용 가능하게 지원
                    plugins: [
                        '@babel/plugin-proposal-class-properties', // Hooks 컴포넌트 사용시 필요없음
                        'react-hot-loader/babel' // react-hot-loader 패키지 설치 시 추가
                    ],

                    // cacheDirectory: true
                }
            }
        ]
    },

    // 추가적인 웹팩 확장 기능 플러그인
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}), // // 모든 로더 모듈(module:{})에 기본적으로 debug: true 를 넣어주는 기능
        // new webpack.HotModuleReplacementPlugin(), // 핫로더 기능을 사용시 플러그인 추가 옵션 없이 사용 가능하지만 브라우저 콘솔창에 `React-Hot-Loader: Hot Module Replacement is not enabled` 오류 에러가 남
    ]
};