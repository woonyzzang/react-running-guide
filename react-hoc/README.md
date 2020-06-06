# React Higher Order Component(HOC) 디자인 패턴
> 코드를 작성하다보면, 자주 반복해서 작성하게 되는 코드들이 있습니다. 우리는 주로 그러한 것들을 함수화하여 재사용 하곤 하죠. 컴포넌트 또한 비슷하죠. 같은 UI 관련 코드가 재사용 될 수 있다면 우리는 컴포넌트를 만들어서 컴포넌트를 재사용합니다. 자, 그런데 컴포넌트 기능 상에서도, 자주 반복되는 코드들이 나타날 수 있습니다. 소프트웨어 개발 원리 중에서 DRY 라는 개념이 있죠 – 같은 작업을 반복하지 마라 (Don’t repeat yourself)

> 리액트 컴포넌트를 작성하게 될 때 반복될 수 있는 코드들은, HOC 를 만들어서 해결해줄 수 있습니다. 

[React HOC 적용 참조](https://velopert.com/3537)

## HOC 작성하기
우리는 이 반복되는 코드를 없애기 위해서 하나의 함수를 작성합니다. 주로 HOC 의 이름을 만들땐 `with_____` 형식으로 짓습니다. 예를들어, 우리는 웹요청을 하는 HOC 를 만들테니 withRequest 라고 지어주도록 하겠습니다.

HOC 의 원리는, 파라미터로 컴포넌트를 받아오고, 함수 내부에서 새 컴포넌트를 만든 다음에 해당 컴포넌트 안에서 파라미터로 받아온 컴포넌트를 렌더링하는 것입니다. 그리고, 자신이 받아온 props 들은 그대로 파라미터로 받아온 컴포넌트에게 다시 주입해주고, 필요에 따라 추가 props 도 넣어줍니다 (예를들어 우리의 경우엔 웹요청 결과물이 되겠죠)

우선 HOC의 틀을 작성해보겠습니다.

**withRequest.js**
``` javascript
import React, { Component } from 'react';

const withRequest = (url) => (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent {...this.props}/>
      )
    }
  }
}

export default withRequest;
```

위 코드를 보면, 함수에서 또 다른 함수를 리턴하도록 했습니다. (url, WrappedComponent) 형식이 아니라, `(url) => (WrappedComponent)` 로 한 이유는, 나중에 여러개의 HOC 를 합쳐서 사용하게 될 때 더욱 편하게 사용하기 위함입니다 – `compose` 같은 함수를 통하여 호출을 간소화 할 수 있죠.

그럼, HOC에 기능을 붙여볼까요?

``` javascript
import React, { Component } from 'react';
import axios from 'axios';

const withRequest = (url) => (WrappedComponen) => {
  return class extends Component {

    state = {
      data: null
    }

    async initialize() {
      try {
        const response = await axios.get(url);
        this.setState({
          data: response.data
        });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.initialize();
    }

    render() {
      const { data } = this.state;
      return (
        <WrappedComponent {...this.props} data={data}/>
      )
    }
  }
}

export default withRequest;
```

axios 를 통하여 받은 data 를 파라미터로 받은 컴포넌트에 넣어주도록 설정을 했습니다.

## HOC 사용하기
HOC 를 다 만들었다면, 사용하는 일만 남았습니다! Post 와 Comments 에서 한번 사용을 해보겠습니다.

**Post.js**
``` javascript
import React, { Component } from 'react';
import withRequest from './withRequest';

class Post extends Component {
  render() {
    const { data } = this.props;
    
    if (!data) return null;

    return (
      <div>
        { JSON.stringify(this.props.data) }    
      </div>
    );
  }
}


export default withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post);
```

컴포넌트를 내보낼때 이렇게 사용하면 됩니다.

혹은,

``` javascript
const PostWithData = withRequest('https://jsonplaceholder.typicode.com/posts/1')(Post)

export default PostWithData;
```

의 형식으로 해도 되겠죠.

Comments 도 마찬가지로 withRequest 를 사용해줄까요?

**Comments.js**
``` javascript
import React, { Component } from 'react';
import withRequest from './withRequest';

class Comments extends Component {
  render() {
    const { data } = this.props;

    if (!data) return null;

    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }
}


export default withRequest('https://jsonplaceholder.typicode.com/comments?postId=1')(Comments);
```

## 정리
이렇게 HOC 를 사용함으로서, 반복되는 코드들이 많이 사라졌습니다. 이렇게 웹요청을 하는 외에도, LifeCycle 메소드를 붙여준다던지, Redux 에서 특정 값을 받아와서 주입해준다던지, 다국어지원을 한다던지 여러가지 일들을 할 수 있습니다.

[recompose](https://github.com/acdlite/recompose) 라는 라이브러리는, 페이스북 개발자가 만든 유용한 HOC 컬렉션 라이브러리인데요, 활용하면 매우 쓸모있습니다. 종류는 굉장히 많은데, 이제 HOC 가 어떤 역할을 하는지 알았으니, recompose 의 [API 문서](https://github.com/acdlite/recompose/blob/master/docs/API.md) 를 쭉 훑어보시면 어떤 것들을 할 수있는지 감을 잡으실 수 있을 것입니다.
