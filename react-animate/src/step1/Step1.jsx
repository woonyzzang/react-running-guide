import React, { useEffect, useState } from 'react';

import './Step.css';

const Step1 = () => {
    const [focused, setFocused] = useState(false);
    const [focused2, setFocused2] = useState(false);

    const onFocus = () => {
        setFocused(true);
    };

    const onBlur = () => {
        setFocused(false);
    };

    const onFocus2 = () => {
        setFocused2(true);
    };

    const onBlur2 = () => {
        setFocused2(false);
    };

    // useEffect(() => {
    //     setFocused2(true);
    // }, []);

    return (
        <>
            <input
                type="text"
                className={['input', (focused) && 'input-focused'].join(' ')}
                onFocus={onFocus}
                onBlur={onBlur}
            />

            <br />
            <br />

            <input
                type="text"
                className={['input', (focused2) && 'input-delay input-focused'].join(' ')}
                onFocus={onFocus2}
                onBlur={onBlur2}
            />
        </>
    );
};

export default Step1;
