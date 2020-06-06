import React from 'react';
import withReportContainer from '../containers/withReportContainer';

const Report2Page = () => {
    const Render1 = (props) => {
        console.log('## Render1 Props:', props.test1);

        return (
            <div>
                <span>옵션1-1</span>
                &nbsp;
                <span>옵션1-2</span>
                &nbsp;
                <span>옵션1-3</span>
            </div>
        );
    };

    return {
        Render1
    };
};

export default withReportContainer({title: '일반사용자 입장'})(Report2Page());
