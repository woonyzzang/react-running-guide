import React from 'react';
import queryString from 'query-string';

const About = ({location, match}) => {
    const query = queryString.parse(location.search);

    // http://localhost:3000/about/react?color=red
    console.log(query);

    const {color} = query;

    return (
        <div>
            <h2 style={{color}}>About</h2>
            <p>{match.params.name}</p>
        </div>
    );
};

export default About;