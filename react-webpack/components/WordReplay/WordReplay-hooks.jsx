const React = require('react');
const { useState, useRef } = React;

const WordReplay = () => {
    const [word, setWord] = useState('리액트');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (word[word.length - 1] === value[0]) {
            setWord(value);
            setResult('딩동댕');
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }

        inputRef.current.focus();
    };

    const onChangeInput = (e) => {
        setValue(e.currentTarget.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요.</label>
                <input type="text" ref={inputRef} value={value} id="wordInput" className="wordInput" onChange={onChangeInput} />
                <button type="submit">입력</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports = WordReplay;