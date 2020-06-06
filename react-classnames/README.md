# React Classnames 설치 환경

- [Classnames API 공식문서](https://github.com/JedWatson/classnames)

## Classnames 패키지 설치
``` bash
$ npm install -S classnames
```

`classNames` 방식을 사용하면 리액트 스타일 적용시 자동으로 css의 클래스 사이에 공백을 넣어 줍니다.

`classNames` 가 정말 편한 이유는 여러 가지 형식으로 사용할 수 있기 때문입니다. 객체 형식이나 배열 형식 또는 혼용해서 전달할 수도 있습니다.

## Classnames 문법
``` javascript
import classNames from 'classnames';

classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```

## 실용 예제
**일반 CSS 조건에 따른 다중 클래스 선언**
``` javascript
...

class App extends Component {
    state = {
        isActive: false
    };    
    
    toggleBox = () => {
        this.setState({
            isActive: !this.state.isActive 
        });
    };

    reder() {
        return (
            <div className="App">
                <div className={`btn ${(isActive) ? '' : 'active'}`}>
                    <p>I'm the Box</p>
                </div>
                
                <button type="button" onClick={this.toggleBox}>button</button>
            </div>
        );
    }
};
```

**Classnames 활용한 조건에 따른 다중 클래스 선언**
``` javascript
...
import classNames from 'classnames/bind';
import styles from './App.css';

const cx = classNames.bind(styles);

class App extends Component {
    state = {
        isActive: false
    };    
    
    toggleBox = () => {
        this.setState({
            isActive: !this.state.isActive 
        });
    };

    reder() {
        const {isActive} = this.state;

        return (
            <div className="App">
                <div className={cx('box', {active: isActive})}>
                    <p>I'm the Box</p>
                </div>
                
                <button type="button" onClick={this.toggleBox}>button</button>
            </div>
        );
    }
}
```
