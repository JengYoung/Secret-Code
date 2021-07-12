import styled from 'styled-components';
import useAnalogClock from '../hooks/useAnalogClock';
const Container = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    background-color: #fff;
    border-radius: 50%;
    margin: 40px auto;
    border: 5px solid white;
    box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);
`;

const Hand = styled.div`
    /* 자바스크립트로 --deg 값을 변경한다. */
    --deg: 0;
    position: absolute;
    bottom: 50%;
    left: 50%;
    border: 1px solid white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform-origin: bottom;
    transform: translate3D(-50%, 0, 0) rotate(calc(var(--deg) * 1deg));
    z-index: 10;
`;

const HourHand = styled(Hand)`
    width: 8px;
    height: 80px;
    background-color: black;
`;

const MinuteHand = styled(Hand)`
    width: 6px;
    height: 110px;
    background-color: black;
`;

const SecondHand = styled(Hand)`
    width: 4px;
    height: 120px;
    background-color: red;
`;


const Mark = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transform: rotate(${props => props.deg * 30}deg);
`;

const AnalogClock = () => {
    const { $hour, $second, $minute } = useAnalogClock();
    return (
        <Container>
            <HourHand ref={$hour}/>
            <SecondHand ref={$second}/>
            <MinuteHand ref={$minute}/>
            {/*
                리턴값으로 요소를 length 값만큼 만들어 낾.
                첫번째 인수: 열의 값,
                두번째 인수: 인덱스
            */}
            {Array.from({ length : 12 }, (key, idx) => {
                return <Mark key={idx} deg={idx}>|</Mark>
            })}
        </Container>
    );
}

export default AnalogClock;