import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h2>Home Page</h2>
            <h3>~~ Hello World ~~</h3>
            <Link to="/report">페이지 이동</Link>
        </div>
    );
};

export default HomePage;
