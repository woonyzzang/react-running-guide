# React MobX 설치 환경
> 리액트 관련 MobX 설치 및 사용 가이드 입니다.

## 참조
- [MobX API 공식문서](https://github.com/mobxjs/mobx)
- [MobX 블로그 설명](https://velog.io/@velopert/MobX-2-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-MobX-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-oejltas52z)

## MobX 패키지 설치
``` bash
$ npm i -S mobx mobx-react
```

## Decorator 와 함께 사용하기
> decorator 를 사용하면 훨씬 더 편하게 문법을 작성 할 수 있습니다.
> 그러려면 babel 설정을 해주셔야 합니다.
> babel 설정을 커스터마이징 하려면 `npm eject` 를 해야합니다.

## babel Decorator 관련 플러그인 패키지 설치
``` bash
$ npm i -S @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

그리고 나서, `package.json` 코드에서 babel 쪽을 찾아서 다음과 같이 `"plugins"` 추가해 수정해주세요.

``` json
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-proposal-class-properties", {"loose": true}]
    ]
}
```

## mobx-react-devtools 개발도구 설치 (디버깅)
``` bash
# deprecated
$ npm i -D mobx-react-devtools
```

기존에 사용하던 `mobx-react-devtools` 패키지 툴은 더이상 사용되지 않으므로 아래 웹브라우저 확장도구 플러그인을 사용해야 합니다.

- [크롬 MobX Developer Tools 확장 프로그램](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod?hl=ko)