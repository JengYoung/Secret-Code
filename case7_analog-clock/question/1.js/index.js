// 요구 사항은 다음과 같다.

// 1. 시계의 시침(.hand.hour 요소), 분침(.hand.minute 요소), 초침(.hand.second 요소)을
// 1초 간격으로 회전시켜 현재 시간을 표시한다.

const renderTime = (() => {
    // 클로저를 통해 한 번만 기억하도록 함. 이후에는 클로저 함수가 이를 기억하여 효율성 기대할 수 있다.
    const $hourHand = document.querySelector('.hand.hour');
    const $minuteHand = document.querySelector('.hand.minute');
    const $secondHand = document.querySelector('.hand.second');

    //Write JS code here!
    return () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        now.getHours();
        now.getMinutes();
        now.getSeconds();
    
        // 초점: 1초당 6도
        $secondHand.style.setProperty('--deg', seconds * 6)
        $minuteHand.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
        $hourHand.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
    }
})();

// HTML 파싱 후 DOM이 완성될 때 작동.
// DOM으로 설정한 변수가 DOM Tree가 발생하지 않을 때 파싱되어 null값이 되지 않도록
document.addEventListener('DOMContentLoaded', () => {
    //Write JS code here!
    setInterval(renderTime, 1000);
});