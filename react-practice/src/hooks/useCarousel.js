// import { useEffect, useRef, useState } from 'react'

// const useCarousel = (imgLength) => {
//     const $container = useRef(null);
//     const $carouselSlides = useRef(null);
//     const $imgRef = useRef(null);

//     const currentSlide = useRef(null);
//     const duration = useRef(500);
//     const timerId = useRef(null);

//     const [ isMoving, setIsMoving ] = useState(false);

//     const onLoad = () => {
//         const { offsetWidth } = $imgRef.current;
//         console.log(offsetWidth);
//         $container.current.style.width = `${offsetWidth}px`;
//         $container.current.style.opacity = 1;
//         moveCarousel(++currentSlide.current);
//     }

//     useEffect(() => {
//         timerId.current = setInterval(() => {
//             moveCarousel(++currentSlide.current, duration)
//         }, 3000)
//     }, [])

//     const onClick = ({ target }) => {
//         if (!target.classList.contains('carousel-control') || isMoving) return;
        
//         clearInterval(timerId.current)
        
//         const delta = target.classList.contains('prev') ? -1 : 1;
//         currentSlide.current += delta;
//         moveCarousel(currentSlide.current, duration);
//     }
    
//     const onTransitionEnd = () => {
//         setIsMoving(false);

//         const delta = currentSlide.current === 0 ? 1 : currentSlide.current === imgLength + 1 ? -1 : 0;
        
//         if (!delta) return;

//         currentSlide.current += imgLength * delta;
//         moveCarousel(currentSlide.current);
//     }
    
//     const moveCarousel = (currentSlide, duration = 0) =>  {
//         setIsMoving(true);
//         $carouselSlides.current.style.setProperty('--duration', duration);
//         $carouselSlides.current.style.setProperty('--currentSlide', currentSlide);
//     };
    
//     return { $container, $carouselSlides, $imgRef, onClick, onTransitionEnd, onLoad }
// }

// export default useCarousel;


import { useState } from 'react';

const useCarousel = () => {
    const [ width, setWidth ] = useState(0);
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ isMoving, setIsMoving ] = useState(false);
    const [ hidden, setHidden ] = useState(true);

    const move = (_currentSlide, _duration = 0) => {
        if (_duration) setIsMoving(true);
        setCurrentSlide(_currentSlide);
        setDuration(_duration);
    };

    return { width, currentSlide, duration, isMoving, setWidth, setIsMoving, move, hidden, setHidden };
}

export default useCarousel;