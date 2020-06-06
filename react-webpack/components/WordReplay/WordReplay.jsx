const React = require('react');
const { Component } = React;

// 클래스 컴포넌트 생명 주기
// constructor -> render -> ref -> componentDidMount
// -> (setState/props 바뀔때) -> shouldComponentupdate(true) -> render -> componenetDidUpdate
// 부모 컨테이너에서 제거 되었을때 -> compoenentWillUnMount -> 소멸

class WordReplay extends Component {
    state = {
        word: '리액트',
        value: '',
        result: ''
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                word: this.state.value,
                result: '딩동댕',
                value: ''
            });
        } else {
            this.setState({
                result: '땡',
                value: ''
            });
        }

        this.inputRef.focus();
    };

    onChangeInput = (e) => {
        this.setState({
           value: e.currentTarget.value
        });
    };

    inputRef;

    onRefInput = (c) => {
        this.inputRef = c;
    };

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <label htmlFor="wordInput">글자를 입력하세요.</label>
                    {/* input에 value={}, onChange={} 를 사용하지 않을꺼면 defaultValue={} 를 선언해야 한다. */}
                    <input type="text" ref={this.onRefInput} id="wordInput" value={this.state.value} onChange={this.onChangeInput} />
                    <button type="submit">입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

module.exports = WordReplay;