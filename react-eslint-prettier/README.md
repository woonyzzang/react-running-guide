# Create React App 에서 ESLint 와 Prettier 설정 하기
> 프로젝트 생성 시 Create React App 을 사용하므로 CRA 기반으로 ESLint 와 Prettier 설정 방법을 알아본다.

## ESLint
자바스크립트의 느슨한 타입과 유연함은 장점이기도 하지만 올바르게 개발하지 않는다면 그만큼 개발자의 실수를 유발하기도 한다. 특히, 여러 사람이 같이 개발하는 경우 구성원 내에서 지켜야 할 스타일 가이드나 코딩 컨벤션이 필수이다.

ESLint 는 개발자들이 지켜야 할 규칙들을 만들수 있도록 해주고 규칙을 지켜서 코딩하는지 체크해 준다.

## ESLint 설치
CRA를 통해 프로젝트 생성 시 ESLint 가 기본으로 포함되어 있으므로 별도 설치하지 않아도 된다.

## ESLint Extension 설치
ESLint 만 설치 했을 때 CLI를 통해서만 결과를 확인할 수 있다. VSCode 에디터에서 바로 바로 결과를 볼 수 있도록 하려면 ESLint Extension 을 설치한다.

## ESLint 동작 확인
VSCode 에서 b = 5; 와 같이 입력하면 PROBLEMS 탭에서 'b' is not defined. eslint(no-undef) 같은 에러가 발생하는 것을 확인 할 수 있다.

## ESLint 설정
ESLint 는 사용자가 원하는대로 ESLint 가 제공하는 규칙들을 설정할 수 있는 방법을 제공한다.

## .eslintrc.* 파일을 이용한 설정 방법
package.json 파일 내의 eslintConfig 를 이용한 설정 방법
.eslintrc.* 파일은 Javascript, JSON, YAML 형태로 작성 가능하며 프로젝트의 루트 디렉토리에 위치해야 한다.

**.eslintrc.json**
``` json
{
  "extends": "react-app"
}
```

## Prettier
Prettier는 파일 저장 시점이나 Git 에 커밋할 때 코드를 자동으로 포맷팅 해줌으로써 일관된 코딩 형태를 유지하도록 해준다.

ESLint 는 규칙을 확인하는 기능 외에 포맷팅 기능도 제공하지만, Prettier를 사용하여 ESLint 는 코딩 컨벤션을 처리하도록 하고 포맷팅 기능은 Prettier 가 담당하도록 구성한다.

## Prettier 설치
``` bash
$ npm install --save-dev --save-exact prettier
```

## Prettier Extension 설치
VSCode 에서 포맷팅이 가능하도록 하거나 파일 저장 시에 포맷팅이 가능하도록 하기 위해서 확장 기능을 설치한다.

파일 저장 시마다 자동으로 포맷팅이 되도록 하려면 아래와 같이 설정을 추가한다.

``` javascript
//set the default
"editor.formatOnSave": false, 
"[javascript]": {
    //default formatter
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
},
```

editor.defaultFormatter 는 beautify 등 다른 포맷터들이 있을 때 기본 포맷터로 Prettier 를 사용하도록 설정하는 옵션

## Prettier 설정
ESLint 와 마찬가지로 두 가지 설정 방법을 제공한다.

- .prettierrc 같은 설정 파일을 이용한 설정 방법
- package.json 파일 내의 "prettier" 를 이용한 설정 방법

설정 파일을 이용한 방법은 다양한 타입을 지원하므로 문서를 참조.

**.prettierrc.json**

``` json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

## Combine ESLint and Prettier
ESLint 로는 스타일을 체크하고 Prettier 로는 포맷팅을 처리하도록 하려면 두 개의 패키지를 설치해야 한다.

``` bash
$ npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

위에서 만든 .eslintrc.json 파일을 다음과 같이 변경해 준다.

```json
{
  "extends": ["react-app", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```

## eslint-config-airbnb
ESLint 의 규칙들을 일일이 설정하기 보다는 잘 되어 있는 것을 가져다 쓰는 것이 더 효율적이다.

``` bash
$ npx install-peerdeps --dev eslint-config-airbnb
```

**.eslintrc.json**
``` json
{
  "extends": ["react-app", "prettier", "airbnb"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": 0
  }
}
```

## intellij 자동 저장
- <https://minjung-jeon.github.io/eslint-prettier-intellij/>

## prettier width get hooks 연동
- <https://jbee.io/web/formatting-code-automatically/>

## Airbnb JavaScript 컨벤션 스타일 가이드
- <https://github.com/ParkSB/javascript-style-guide>

### 참조
- <https://prettier.io/>
- <https://velog.io/@gwangsuda/2019-09-25-1009-%EC%9E%91%EC%84%B1%EB%90%A8-bwk0ylejxj>
- <https://velog.io/@velopert/eslint-and-prettier-in-react>
