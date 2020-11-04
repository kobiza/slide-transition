import React, { useState } from 'react';
import cx from 'classnames';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './App.scss';

function Slide(props) {
  const { in: show, title, color,  onEntered} = props;

  return (
      <CSSTransition
          in={show}
          timeout={3000}
          classNames="slide"
          unmountOnExit
          onEntered={onEntered}
      >
        <div id={title} className="slide" style={{backgroundColor: color}}><h1>{title}</h1></div>
      </CSSTransition>
  );
}

function SlideShow({slidesData, currentSlide, reverse, onSlideEntered, animationType}) {
  const slides = slidesData.map(({title, color}, index) => (
      <Slide title={title} color={color} key={index} onEntered={onSlideEntered}/>
  ))
  return (
      <div className={cx('slides', {reverse: reverse, [animationType]: true})}>
        <TransitionGroup className="row">
          {slides[currentSlide]}
        </TransitionGroup>
      </div>
  )
}

function App() {
  const data = {
    slides: [
      {title: 'Slide 1', color: '#3498db'},
      {title: 'Slide 2', color: '#f1c40f'},
      {title: 'Slide 3', color: '#8e44ad'},
      {title: 'Slide 4', color: '#2ecc71'},
    ]
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [inTransition, setInTransition] = useState(false);
  const [animationType, setAnimationType] = useState('SlideHorizontal');

  const moveToNxtSlide = () => {
    if (inTransition) {
        console.log('moveToNxtSlide rejected')
        return;
    }

    console.log('moveToNxtSlide')
    const newIndex = currentSlide === data.slides.length - 1 ? 0 : currentSlide + 1

    setInTransition(true)
    setReverse(false)
    setCurrentSlide(newIndex)
  }

  const moveToPrevSlide = () => {
    if (inTransition) {
      console.log('moveToPrevSlide rejected')
      return;
    }
    console.log('moveToPrevSlide')
    const newIndex = currentSlide === 0 ? data.slides.length - 1 : currentSlide - 1

    setInTransition(true)
    setReverse(true)
    setCurrentSlide(newIndex)
  }

    const moveToIndex = (newIndex) => {
        if (inTransition) {
            console.log(`moveToIndex ${newIndex} rejected`)
            return;
        }
        console.log(`moveToIndex ${newIndex}`)
        const isSlideBefore = newIndex < currentSlide

        setInTransition(true)
        setReverse(isSlideBefore)
        setCurrentSlide(newIndex)
    }

  const onSlideEntered = () => {
      setInTransition(false)
  }

  const isSelectedAnimation = (_animationType) => _animationType === animationType

    const dots = data.slides.map((s, index) => (
        <button key={index} onClick={() => moveToIndex(index)}>{index + 1}</button>
    ))
    const animationsButtons = ['SlideHorizontal', 'SlideVertical', 'OutIn', 'CrossFade'].map(_animationType => (
        <button key={_animationType} className={cx('animation-button', {'is-selected': isSelectedAnimation(_animationType)})} onClick={() => setAnimationType(_animationType)}>{_animationType}</button>
    ))
  return (
    <div className="App">
        <div className="animations-buttons">
            {animationsButtons}
        </div>
        <div className="comp">
            <button className="prev-button" onClick={moveToPrevSlide}>prev</button>
            <button className="next-button" onClick={moveToNxtSlide}>next</button>
            <SlideShow currentSlide={currentSlide} slidesData={data.slides} reverse={reverse} onSlideEntered={onSlideEntered} animationType={animationType}/>
            <div className="dots-wrapper">
                {dots}
            </div>
        </div>
    </div>
  );
}

export default App;
