import React, { useState, useEffect } from 'react';

const withWindowScrollContainer = (WrappedComponent) => {
    // [D] useState || useEffect 을 사용하려면 커링 패턴처럼 사용해야 한다.
    const WithWindowScrollContainer = (props) => {
        const [scrollPosX, setScrollPosX] = useState(0);
        const [scrollPosY, setScrollPosY] = useState(0);

        /**
         * onScrollHandler
         * @description 윈도우 스크롤 이벤트 핸들러
         */
        const onScrollHandler = () => {
            const {innerHeight} = window;
            const {scrollHeight} = document.body;
            // IE에서는 document.documentElement 를 사용.
            const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

            // console.log('innerHeight: ', innerHeight);
            // console.log('scrollHeight: ', scrollHeight);
            // console.log('scrollTop: ', scrollTop);

            setScrollPosX(window.pageXOffset);
            setScrollPosY(window.pageYOffset);

            // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
            if (((scrollHeight - innerHeight) - scrollTop) < 100) {
                console.log('--- Almost Bottom Of This Browser ---');
            }
        };

        useEffect(() => {
            // 스크롤링 이벤트 추가
            window.addEventListener('scroll', onScrollHandler);

            // 언마운트 될때에, 스크롤링 이벤트 제거
            return () => {
                window.removeEventListener('scroll', onScrollHandler);
            };
        }, []);

        // [D] {...props} 는 HOC를 호출한 부모컴포넌트의 props로 라우터 속성을 같이 전달할 수 있다.
        return <WrappedComponent {...props} scrollX={scrollPosX} scrollY={scrollPosY}/>;
    };

    return WithWindowScrollContainer;
};

export default withWindowScrollContainer;