import React from 'react';

import api from './api';
import user from './api/user';

function App() {
    api.GET(user.GET_INFO)
        .then((res) => {
            console.log( res.data.title );
        })
        .catch((err) => {
            console.error(err);
        });

    return (
        <h1>Hello World</h1>
    );
}

export default App;