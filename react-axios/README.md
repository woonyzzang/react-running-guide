# React Axios 설치 환경
> 리액트 관련 Axios 설치 및 사용 가이드 입니다.

## 참조
[MobX API 공식문서](https://github.com/axios/axios)

## Axios 패키지 설치
``` bash
$ npm i -S axios
```

## 저수준 API
``` javascript
axios.get(config);
axios.delete(url, config);
```

## 각 메소드별 별칭
``` javascript
axios.get(url[, config]); # GET
axios.delete(url[, config]); # DELETE
axios.post(url[, data[, config]]); # POST
axios.put(url[, data[, config]]); # UPDATE
axios.head(url[, config]);
axios.options(url[, config]);
```

## Axios 요청 방법
**[저수준 API]**

axios 저수준 메서드의 특징은 모든 전달값을 config 객체로 전달한다는 점입니다.
다른 여러 가지 옵션이 있지만 `method`, `url`, `params` 등의 간단한 정보만을 전달하여 GET / api/example?param=1&param2 와 같은 요청을 할 수 있습니다.

``` javascript
axios({
    method: 'GET',
    url: '/api/example/',
    params: {param:1, param: 2}
}).then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.error(`ERROR!! : ${err}`);
});
```

**[별칭 API]**

``` javascript
axios.get('/api/example/', {
    params: {param:1, param: 2}
}).then((res) => {
    console.log(res.data);
}).catch((err) => {
    console.error(`ERROR!! : ${err}`);
});
```

## Axios 응답 형식
웹브라우저 개발자 도구 콘솔 로그 확인

``` text
Object {
    config: Object # 요청시에 사용된 config 옵션 정보
    headers: Object # 응답 헤더 정보
    request: XMLHttpRequest # 서버와 통신 시에 사용된 XMLHttpRequest 객체 정보
    status: 200 # HTTP 상태 코드(HTTP Status Code)
    statusText: "OK" # 서버 상태를 나타내는 문자열 정보
}
```

**HTTP 응답 상태 코드 의미**
- 2XX: 성공
- 3XX: 리다이렉션
- 4XX: 요청 오류(클라이언트 측 오류)
- 2XX: 서버 오류

## Axios 사용 시 주의 사항
axios를 사용하면서 `then()` 를 처리할 때는 ECMAScript6의 화살표 함수(Arrow Function)를 사용할 것을 권장 합니다.