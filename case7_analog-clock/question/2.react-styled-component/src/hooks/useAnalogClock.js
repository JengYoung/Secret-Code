import { useEffect, useRef } from 'react';

const useAnalogClock = () => {
    const $hour = useRef(null);
    const $minute = useRef(null);
    const $second = useRef(null);

    useEffect(() => {
        const timerId = setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            now.getHours();
            now.getMinutes();
            now.getSeconds();
        
            // 초점: 1초당 6도
            $second.current.style.setProperty('--deg', seconds * 6)
            $minute.current.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
            $hour.current.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
        }, 1000)

        return () => {
            clearInterval(timerId);
        }
    }, [])

    return { $hour, $second, $minute };
}

export default useAnalogClock;