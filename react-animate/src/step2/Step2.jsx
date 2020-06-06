import React, { useState } from 'react';

const styles = {
    button: {
        width: 180,
        height: 50,
        border: 'none',
        backgroundColor: '#bbb',
        borderRadius: 4,
        fontSize: 20,
        cursor: 'pointer',
        transition: '.25s all',
    },
    buttonEnabled: {
        backgroundColor: '#ffc107',
        width: 220,
    },
    input: {
        width: 200,
        outline: 'none',
        fontSize: 20,
        padding: 10,
        border: 'none',
        backgroundColor: '#ddd',
        marginTop: 10,
    }
};

const Step2 = () => {
    const [disabled, setDisabled] = useState(true);

    const onChange = (e) => {
        const length = e.target.value.length;

        if (length >= 4) {
            setDisabled(false);
        } else if (!disabled) {
            setDisabled(true);
        }
    };

    return (
        <>
            <button
                type="button"
                disabled={disabled}
                style={Object.assign({}, styles.button, !disabled && styles.buttonEnabled)}
            >
                {
                    (disabled) ? 'Disabled' : 'Submit'
                }
            </button>
            <div>
                <input
                    style={styles.input}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default Step2;
