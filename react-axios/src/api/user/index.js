/**
 * RESTful API
 * 포스트 관련 Endpoint 샘플
 */

// const BASE_URL = '/api';
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default {    
    // 포스트 읽기
    'POST': `${BASE_URL}/1`,
    // 포스트의 덧글 읽기
    'COMMENT': `${BASE_URL}/1/comment`
};