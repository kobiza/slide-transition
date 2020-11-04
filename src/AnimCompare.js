import React, { useState, useRef } from 'react';
import { TweenMax } from "gsap/all";
import cx from 'classnames';

import './App.scss';
import './AnimCompare.scss';


function App() {
    const [isPlaying, setIsPlaying] = useState(false)
    const anim1ItemRef = useRef(null);

    //slideHorizontal, slideVertical
    const animate1 = () => {
        TweenMax.fromTo(anim1ItemRef.current, 2, { x: 0 }, { x: 270, ease: 'Strong.easeInOut'});
        // easeInOutExpo
    }

    // outIn - sourceEase
    const animate2 = () => {
        TweenMax.fromTo(anim1ItemRef.current, 2, { x: 0 }, { x: 270, ease: 'Strong.easeOut' });
        // easeOutQuint
    }

    // outIn - destEase
    const animate3 = () => {
        TweenMax.fromTo(anim1ItemRef.current, 2, { x: 0 }, { x: 270, ease: 'Strong.easeIn'});
        // easeInQuint
    }

    // crossFade
    const animate4 = () => {
        TweenMax.fromTo(anim1ItemRef.current, 2, { x: 0 }, { x: 270, ease: 'Sine.easeInOut' });
        // easeInOutSine
    }

    const resetAnimate1 = () => {
        TweenMax.to(anim1ItemRef.current, 0, {x: 0})
    }

    const cssAllCssAnim = [
        "easeInSine",
        "easeOutSine",
        "easeInOutSine",
        "easeInQuad",
        "easeOutQuad",
        "easeInOutQuad",
        "easeInCubic",
        "easeOutCubic",
        "easeInOutCubic",
        "easeInQuart",
        "easeOutQuart",
        "easeInOutQuart",
        "easeInQuint",
        "easeOutQuint",
        "easeInOutQuint",
        "easeInExpo",
        "easeOutExpo",
        "easeInOutExpo",
        "easeInCirc",
        "easeOutCirc",
        "easeInOutCirc",
        "easeInBack",
        "easeOutBack",
        "easeInOutBack",
    ]
        .map((animationName, index) => ({animationName, index}))
        // .filter(({index}) => (index - 2) % 3 === 0)
        // .filter(({index}) =>  index >= 2 && index <= 8)
        .map(({animationName, index}) => (
        <div key={animationName} className="container-wrapper">
            <span>{index}</span>
            <div className="container">
                <div className={cx('item', animationName, {'animate-right': isPlaying})}></div>
            </div>
        </div>

    ))

    return (
    <div className="App">
        <button onClick={() => {
            setIsPlaying(true)
            animate4()
        }}>start</button>
        <button onClick={() => {
            setIsPlaying(false)
            resetAnimate1()
        }}>reset</button>
        <div className="container-wrapper">
            <div className="container">
                <div ref={anim1ItemRef} className="item compare-src"></div>
            </div>
        </div>

        {cssAllCssAnim}
    </div>
  );
}

export default App;
