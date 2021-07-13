import styled from 'styled-components';
import useCarousel from '../hooks/useCarousel';
import img1 from '../imgs/movie-1.jpg';
import img2 from '../imgs/movie-2.jpg';
import img3 from '../imgs/movie-3.jpg';
import img4 from '../imgs/movie-4.jpg';
import Buttons from './Buttons';

const StyledCarousel = styled.div`
    width: ${({ width }) => width}px;
    position: relative;
    margin: 0 auto;
    &.hidden {
        overflow: hidden;
    }
    /* carousel 요소의 width 셋팅이 완료될 때까지 감춘다. */
    opacity: ${({ width }) => (width ? 1 : 0)};
`;
const StyledCarouselSlides = styled.div`
    /* 수평 정렬 */
    display: flex;
    transition: transform ${({ duration }) => duration}ms ease-out;
    transform: translate3D(${({ currentSlide }) => currentSlide * -100}%, 0, 0);
    img {
        padding: 5px;
    }
`;

// const Carousel = () => {
//     const images = [
//         img1, img2, img3, img4
//     ];
//     const { $container, $carouselSlides, $imgRef, onClick, onTransitionEnd, onLoad } = useCarousel(images.length);

//     return (
//         <>
//             <StyledCarousel ref={$container} onClick={onClick} onTransitionEnd={onTransitionEnd}>
//                 <StyledCarouselSlides ref={$carouselSlides}>
//                     {[images[images.length - 1],...images,images[0]].map((image, idx) =>
//                         <img onLoad={onLoad} ref={$imgRef} key={idx} src={image} idx={idx}  alt="Carousel"/>
//                     )}
//                 </StyledCarouselSlides>
//             </StyledCarousel>
//         </>
//     )
// }
const Carousel = () => {
    const images = [
        img1, img2, img3, img4
    ];
    const { width, currentSlide, duration, isMoving, setWidth, setIsMoving, move, hidden } = useCarousel();

    const handleImageLoad = ({ target }) => {
        if (width !== target.offsetWidth) setWidth(target.offsetWidth);
        move(1);
    };
    const handleClick = ({ target: { id }}) => {
        console.log('hi', isMoving)
        if (isMoving) return;

        const delta = id === 'prev' ? -1 : 1;
        move(currentSlide + delta, 500);
    }

    const handleTransitionEnd = () => {
        console.log("발똥")
        setIsMoving(false);

        const delta = currentSlide === 0 ? 1 : currentSlide === images.length + 1 ? -1 : 0;

        if (delta) move(currentSlide + images.length * delta);
    };
    const imgArr = [images[images.length - 1],...images,images[0]]
    return (
        <>
            <StyledCarousel width={width} className="carousel hidden">
                <StyledCarouselSlides 
                    currentSlide={currentSlide}
                    duration={duration}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {imgArr.map((url, idx) =>
                        <img 
                            onLoad={handleImageLoad} 
                            key={idx} 
                            src={url} 
                            alt="Carousel"
                        />
                    )}
                </StyledCarouselSlides>
                <Buttons handleClick={handleClick} />
            </StyledCarousel>
        </>
    )
}
export default Carousel;