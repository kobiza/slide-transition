import React, { useState } from 'react';
import { TweenMax } from "gsap/all";
import { Transition, TransitionGroup } from "react-transition-group";
import './AppGsap.css';

function Slide(props) {
  const { in: show, title, color } = props;

  let prevSlide, nextSlide
  return (
      <Transition
          timeout={1000}
          mountOnEnter
          unmountOnExit
          appear
          in={show}
          onEnter={(node) => {
            console.log('onEnter', node.id)
            nextSlide = node.id
          }}
          // onEntering={(node) => {console.log('onEntering', node.id)}}
          onEntered={(node) => {
            console.log('onEntered', node.id)
            nextSlide = null
          }}
          onExit={(node) => {
            console.log('onExit', node.id)
            prevSlide = node.id
          }}
          // onExiting={(node) => {console.log('onExiting', node.id)}}
          onExited={(node) => {
            console.log('onExited', node.id)
            prevSlide = null
          }}
          addEndListener={(node, done) => {
            console.log('addEndListener', node.id)
            TweenMax.to(node, 2, {
              x: show ? 0 : '-100%',
              autoAlpha: show ? 1 : 0,
              onComplete: () => {
                console.log('TweenMax onComplete', node.id)
                done()
              },
              delay: 0
            });
          }}
      >
        <div id={title} className="slide" style={{backgroundColor: color}}><h1>{title}</h1></div>
      </Transition>
  );
}

function SlideShow({slidesData, currentSlide}) {
  const slides = slidesData.map(({title, color}, index) => (
      <Slide title={title} color={color} key={index}/>
  ))
  return (
      <div className="slides">
        <TransitionGroup className="row">
          {slides[currentSlide]}
        </TransitionGroup>
      </div>
  )
}

function AppGsap() {
  const data = {
    slides: [
      {title: 'Slide 1', color: '#3498db'},
      {title: 'Slide 2', color: '#f1c40f'},
      {title: 'Slide 3', color: '#8e44ad'},
      {title: 'Slide 4', color: '#2ecc71'},
    ]
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const moveToNxtSlide = () => {
    console.log('--- moveToNxtSlide ---')
    const newIndex = currentSlide === data.slides.length - 1 ? 0 : currentSlide + 1

    setCurrentSlide(newIndex)
  }

  return (
    <div className="App">
      <button onClick={moveToNxtSlide}>Move to next slide</button>
      <SlideShow currentSlide={currentSlide} slidesData={data.slides}/>
    </div>
  );
}

export default AppGsap;
