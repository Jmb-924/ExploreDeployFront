import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'

const SlideImg = ({ children }) => {
   const [nav1, setNav1] = useState(null)
   const [nav2, setNav2] = useState(null)

   let sliderRef1 = useRef(null)
   let sliderRef2 = useRef(null)

   useEffect(() => {
      setNav1(sliderRef1)
      setNav2(sliderRef2)
   }, [])

   const settings1 = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    var settings2 = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 4,
      slidesToShow: 4
    };
   return (
      <>
         <Slider {...settings1} asNavFor={nav2} ref={slider => (sliderRef1 = slider)}>
            {Array.isArray(children) ? children.map((child, index) => (
               <div key={index}>{child}</div>
            )) : (
               <div className='img'>{children}</div>
            )}
         </Slider>
         <Slider {...settings2} asNavFor={nav1} ref={slider => (sliderRef2 = slider)} slidesToShow={3} swipeToSlide focusOnSelect>
            {Array.isArray(children) ? children.map((child, index) => (
               <div className='img' key={index}>{index}</div>
            )) : (
               <div className='img'>{children}</div>
            )}
         </Slider>
      </>
   )
}

SlideImg.propTypes = {
   children: PropTypes.node
}

export {
   SlideImg,
}