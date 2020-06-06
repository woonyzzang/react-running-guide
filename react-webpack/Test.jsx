import React, { useState, useRef, useCallback, useMemo, memo } from 'react';

const tblData = [
    {
        title: '제목1',
        content: [
            {scope: 'A-1', text: 'A-1', selected: false}
        ]
    },
    {
        title: '제목2',
        content: [
            {scope: 'B-1', text: 'B-1', selected: false},
            {scope: 'B-2', text: 'B-2', selected: false}
        ]
    },
    {
        title: '제목3',
        content: [
            {scope: 'D-1', text: 'D-1', selected: false},
            {scope: 'D-2', text: 'D-2', selected: false},
            {scope: 'D-2', text: 'D-2', selected: false}
        ]
    },
    {
        title: '제목4',
        content: [
            {scope: 'D-1', text: 'D-1', selected: false},
            {scope: 'D-2', text: 'D-2', selected: false}
        ]
    }
];

const getPrevItem = (list) => {
    console.log(list);
};

const Test = memo(() => {
    const [list, setList] = useState(tblData);
    let prevItem = useRef([0, 0, {}]);

    const memoListItem = useMemo(() => getPrevItem(prevItem), [list]);

    const onSelected = useCallback((item, i, j) => {
        const newList = [...list]; // list.slice()
        let updatedItem = [...newList[i].content][j];

        newList[prevItem.current[0]].content[prevItem.current[1]] = {...newList[prevItem.current[0]].content[prevItem.current[1]], selected: false}; // 이전 셀렉터 활성화 초기화
        newList[i].content[j] = {...updatedItem, selected: !{...updatedItem}.selected}; // 현재 셀렉터 활성화
        
        // 이전 셀렉터 정보 저장
        prevItem.current[0] = i; // tblData[i] 배열 위치
        prevItem.current[1] = j; // tblData[i].content[j] 배열 위치
        prevItem.current[2] = item; // tblData[i].content[j] 안에 객체{...}

        setList(newList);
    }, []);

    const createRender = () => {
        return list.map((data, i) => {
            return (
                <ul key={i} style={{border: '1px solid red'}}>
                    {
                        data.content.map((item, j) => {
                            const {text, selected} = item;

                            return (
                                <li key={j} style={{background: (selected) ? 'blue' : null, padding: '10px', border: '1px solid red'}} onClick={() => onSelected(item, i, j)}>{text}</li>
                            );
                        })
                    }
                </ul>
            );
        });
    };

    return (
        <div style={{border: '2px solid'}}>
            {
                createRender()
            }
        </div>
    );
});

export default Test;