import React from 'react';
import withWindowScrollContainer from '../Containers/withWindowScrollContainer';

const InfiniteScrollPage = ({scrollX, scrollY}) => {
    // console.log('scrollX:', scrollX);
    // console.log('scrollY:', scrollY);

    return (
        <div style={{height: 3000}}>
            <div style={{position: 'fixed', top: 0, left: 0, border: '1px solid'}}>
                <strong>scrollTop:</strong>
                {scrollY}
            </div>
        </div>
    );
};

export default withWindowScrollContainer(InfiniteScrollPage);