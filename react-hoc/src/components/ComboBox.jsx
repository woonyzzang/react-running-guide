import React from 'react';

const ComboBox = ({test2}) => {
    return (
        <div>
            {test2}
            &nbsp;
            <select>
                <option>옵션1-1</option>
                <option>옵션2-1</option>
                <option>옵션3-1</option>
            </select>
            &nbsp;
            <select>
                <option>옵션1-2</option>
                <option>옵션2-2</option>
                <option>옵션3-2</option>
            </select>
            &nbsp;
            <select>
                <option>옵션1-3</option>
                <option>옵션2-3</option>
                <option>옵션3-3</option>
            </select>
        </div>
    );
};

export default ComboBox;
