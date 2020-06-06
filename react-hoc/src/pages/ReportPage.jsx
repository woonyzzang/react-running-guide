import React from 'react';
import withReportContainer from '../containers/withReportContainer';
import ComboBox from '../components/ComboBox';

const ReportPage = () => {
    const Render1 = (props) => {
        console.log('## Render1 Props:', props.test1);

        return (
            <ComboBox test2={'콤보박스 Props'}/>
        );
    };

    const Render2 = (props) => {
        console.log('## Render2 Props:', props.test1);

        return (
            <div>
                <h4>관리자만 보이는 영역</h4>
            </div>
        );
    };

    return {
        Render1,
        Render2
    };
};

export default withReportContainer({title: '관리자 입장'})(ReportPage());
