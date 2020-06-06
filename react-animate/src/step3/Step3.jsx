import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';

const styles = {
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        cursor: 'pointer',
        width: 200,
        height: 45,
        border: 'none',
        borderRadius: 4,
        backgroundColor: '#ffc107',
    },
    menu: {
        overflow: 'hidden',
        border: '2px solid #ddd',
        width: 300,
        marginTop: 20,
    },
    selection: {
        padding: 10,
        margin: 0,
        borderBottom: '1px solid #ededed'
    }
};

const Step3 = () => {
    const [height, setHeight] = useState(38);

    const animate = () => {
        setHeight((prevHeight) => {
            return (prevHeight === 233) ? 38 : 233;
        });
    };

    return (
        <>
            <div style={styles.button} onClick={animate}>Drop Toggle Menu</div>
            <Motion style={{height: spring(height)}}>
                {
                    ({height}) =>
                    (<div style={Object.assign({}, styles.menu, {height})}>
                        <p style={styles.selection}>Selection 1</p>
                        <p style={styles.selection}>Selection 2</p>
                        <p style={styles.selection}>Selection 3</p>
                        <p style={styles.selection}>Selection 4</p>
                        <p style={styles.selection}>Selection 5</p>
                        <p style={styles.selection}>Selection 6</p>
                    </div>)
                }
            </Motion>
        </>
    );
};

export default Step3;
