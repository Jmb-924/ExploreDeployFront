import { useState, useEffect, useCallback } from 'react';
import './css/index.css'

import PropTypes from 'prop-types'

const Carousel = ({ children, arrows, buttons, timing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? children.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = useCallback(() => {
    const newIndex = currentIndex === children.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, children.length]);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, timing[currentIndex]); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [currentIndex, goToNextSlide,]);

  return (
    <div className="carousel">
      <div className="carousel-content">
        <div className="slides">
          {Array.isArray(children) ? children.map((child, index) => (
            <div key={index} className={index === currentIndex ? "slide active-slide" : "slide"}>
              {child}
            </div>
          )) : (
            <div className={"slide active-slide"}>
              {children}
            </div>
          )}
        </div>
        {arrows && (
          <div className="navigation-arrows">
            <button type='button' onClick={() => goToPrevSlide}>Prev</button>
            <button type='button' onClick={() => goToNextSlide}>Next</button>
          </div>
        )}
        {buttons && (
          <div className="navigation-bottom">
            <div className="navigation">
              {Array.isArray(children) ? children.map((child, index) => (
                <button key={index} onClick={() => goToSlide(index)}>{index + 1}</button>
              )) : (
                <button>1</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  arrows: PropTypes.bool,
  buttons: PropTypes.bool,
  timing: PropTypes.array,
  children: PropTypes.node
}

export {
  Carousel,
}