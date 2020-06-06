import React, { useEffect, useState } from 'react';
import { Motion, StaggeredMotion, TransitionMotion, spring } from 'react-motion';


const Step4 = () => {
    const [items, setItems] = useState([{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}]);

    const willLeave = () => {
        return {width: spring(0), height: spring(0)};
    };

    useEffect(() => {
        setItems([{key: 'a', size: 10}, {key: 'b', size: 20}]);
    }, []);

    return (
        <>
            <strong>example 1.</strong>
            <Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
                {value => <div>{value.x}</div>}
            </Motion>

            <br />

            <strong>example 2.</strong>
            <TransitionMotion
                willLeave={willLeave}
                styles={items.map(item => ({
                    key: item.key,
                    style: {width: item.size, height: item.size},
                }))}>
                {
                    (interpolatedStyles) =>
                        <div>
                            {
                                (interpolatedStyles).map((config) => {
                                    return <div key={config.key} style={{...config.style, border: '1px solid'}} />
                                })
                            }
                        </div>
                }
            </TransitionMotion>

            <br />

            <strong>example 3.</strong>
            <StaggeredMotion
                defaultStyles={[{h: 0}, {h: 0}, {h: 0}]}
                styles={(prevInterpolatedStyles) => prevInterpolatedStyles.map((_, i) => {
                    return (i === 0) ? {h: spring(100)} : {h: spring(prevInterpolatedStyles[i - 1].h)}
                })}
            >
                {
                    (interpolatingStyles) =>
                    <div>
                        {
                            interpolatingStyles.map((style, i) => <div key={i} style={{border: '1px solid', height: style.h}} />)
                        }
                    </div>
                }
            </StaggeredMotion>
        </>
    );
};

export default Step4;
