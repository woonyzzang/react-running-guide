# React Router 설치 환경
- [React Router DOM API](https://github.com/ReactTraining/react-router)
- [React Router 적용 참조](https://velopert.com/3417)

## React Router 패키지 설치
``` bash
$ npm i -S react-router-dom
```

## 디렉토리 구조
``` javascript
|- [src]
|-- [pages]
|--- HomePage.jsx.jsx
|--- About.jsx
|- App.js
|- index.js
|- Root.js
```

## App.js
``` javascript
import React from 'react';
import { Route } from 'react-router-dom';

import { HomePage, About } from './pages';

const App = () => {
    return (
        <div>
            <h1>리액트 라우터</h1>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={About} />
            <Route path="/about/:name" component={About} />
        </div>
    );
};

export default App;
```

라우트를 설정 할 때에는 **Route** 컴포넌트를 사용하고, 경로는 `path` 값으로 설정합니다.

첫번째 라우트 `/` 의 경우에는 HomePage 컴포넌트를 보여주게 했고, 두번째 라우트 `/about` 에서는 About 컴포넌트를 보여주게 했습니다.

첫번째 라우트의 경우엔 `exact` 가 붙어있지요? 이게 붙어있으면 주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여줍니다.

## Root.js
``` javascript
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const Root = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default Root;
```

## index.js
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));
```

- - -

## pages > HomePagePage.jsx
``` javascript
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <h2>HomePage</h2>
        </div>
    );
};

export default HomePage;
```

## pages > About.jsx
``` javascript
import React from 'react';

const About = () => {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
};

export default About;
```

## 라우트 파라미터 읽기
라우트의 경로에 특정 값을 넣는 방법을 알아보겠습니다. 방법은 두가지가 있는데요, `params` 를 사용하는 것 과, `query` 를 사용하는 것 입니다.

라우트로 설정한 컴포넌트는, 3가지의 props 를 전달받게 됩니다:

- `history` 이 객체를 통해 `push`, `replace` 를 통해 다른 경로로 이동하거나 앞 뒤 페이지로 전환 할 수 있습니다.
- `location` 이 객체는 현재 경로에 대한 정보를 지니고 있고 URL 쿼리 (`/about?foo=bar` 형식) 정보도 가지고있습니다.
- `match` 이 객체에는 어떤 라우트에 매칭이 되었는지에 대한 정보가 있고 params (`/about/:name` 형식) 정보를 가지고있습니다.

URL 쿼리의 경우엔 컴포넌트 내에서 동적으로 사용 할 수 있고, params 의 경우엔 사용하기 전에 꼭 라우트에서 지정을 해주어야합니다.

- - -

# URL 쿼리
리액트 라우터 v3 에서는 URL 쿼리를 해석해서 객체로 만들어주는 기능이 자체적으로 있었는데요, 쿼리를 파싱하는 방식은 여러가지가 있어서, 개발자들이 여러가지를 방식을 사용 할 수 있도록 이 기능을 더이상 내장하지 않습니다. 따라서 URL 쿼리를 해석하는것은 우리의 몫입니다.

쿼리를 해석하기 위해선, 라이브러리를 설치해주세요. 자체적으로 구현하는 방법도 있겠지만 라이브러리를 사용하는것이 훨씬 간편합니다.

## Query String 패키지 설치
```` bash
$ npm i -S query-string
````

## pages > About.jsx
``` javascript
import React from 'react';
import queryString from 'query-string';

const About = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    const detail = query.detail === 'true';

    return (
        <div>
            <h2>About {match.params.name}</h2>
            {detail && 'detail: blahblah'}
        </div>
    );
};

export default About;
```
이제 `?detail=true` 가 주소 뒤에 붙어야만, `‘detail: blahblah’` 문자열이 나타나게 됩니다.

URL 쿼리를 만들 때 주의하실 점은, 받아오는 값들은 모두 문자열이라는 것 입니다. 따라서 비교를 해야 할 땐 boolean 을 불러오던 숫자를 불러오던, 문자열 형태로 비교를 하거나, 알맞는 형태로 변환을 시킨다음에 비교를 하세요.

- - -

# 라우트 이동하기
## Link 컴포넌트
앱 내에서 다른 라우트로 이동 할 때에는, 일반 <a href...>foo</a> 형식으로 하면 안됩니다. 왜냐하면, 이렇게하면 새로고침을 해버리기 때문이지요.

새로고침을 하기 위해선, 리액트 라우터에 있는 Link 컴포넌트를 사용해야합니다. 이 컴포넌트를 사용하면 페이지를 새로 불러오는걸 막고, 원하는 라우트로 화면 전환을 해줍니다.

그럼, 한번 사용해볼까요?

components 디렉토리에 Menu 라는 컴포넌트를 다음과 같이 만들어보세요:

``` javascript
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            <ul>
                <li><Link to="/">HomePage</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/about/foo">About Foo</Link></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;
```

## NavLink 컴포넌트
NavLink 컴포넌트는 Link 랑 비슷한데요, 만약에 설정한 URL 이 활성화가 되면, 특정 스타일 혹은 클래스를 지정 할 수 있습니다.

``` javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>HomePage</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink to="/about/foo" activeStyle={activeStyle}>About Foo</NavLink></li>
            </ul>
            <hr/>
        </div>
    );
};

export default Menu;
```

## 자바스크립트에서 라우팅
``` javascript
import Reacr from 'react;

const HomePage = ({history}) => {
    return (
        <div>
            <h2>HomePage</h2>
            <button onClick={() => {
                history.push('/about/javascript');
            }}>자바스크립트를 사용하여 이동</button>
        </div>
    );
};

export default HomePage;
```
