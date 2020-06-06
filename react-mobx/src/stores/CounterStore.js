import { observable, action } from 'mobx';

// MobX 에서 스토어를 만드는건 생각보다 간단합니다.
// 리덕스처럼 리듀서나, 액션 생성함수.. 그런건 없습니다.
// 그냥 하나의 클래스에 observable 값이랑 함수들을 만들어주면 됩니다.
export default class CounterStore {
    @observable number = 0;

    @action increase = () => {
        this.number++;
    };

    @action decrease = () => {
        this.number--;
    };
}