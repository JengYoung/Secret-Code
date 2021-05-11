// Write Javascript code here!

// import "./style.css";



const items = document.querySelectorAll('.item');
// 성능저하 - 이벤트 감지가 30개 있기 때문에.
// 목록이 끊임없이 변화할 때. (아이템 하나를 더 추가할 경우, 추가할 때마다 addEventListener 등록을 해줘야 함.)
// items.forEach(function(item) {
//     item.addEventListener('click', function(e) {
//         console.log(item);
//         item.classList.toggle('open');
//         items.forEach(function(elem) {
//             if(elem !== item) elem.classList.remove('open');
//         })
//     })
// });

// 해결 방법: wrapper 활용.
const wrapper = document.querySelector('.wrapper');

// wrapper.addEventListener('click', function(e) {
//     const targetElem = e.target;
//     if (!targetElem.classList.contains('item')) return;
//     e.stopPropagation();
//     targetElem.classList.toggle('open');
//     items.forEach(function(elem) {
//         if (elem !== targetElem) elem.classList.remove('open');
//     });
// });

/*
* ! 이벤트 등록은 가급적 최소화하는 것이 바람직하다!
* 이벤트의 bubbling capturing에 대한 정확한 이해 필요.

! bubbling capturing ? 
! wrapper은 상위 엘리먼트, item은 하위 엘리먼트. 
! 하위에서 클릭 이벤트 발생 시, 상위에 전파(bubbling) => wrapper에 click이 이벤트가 있기 때문에 실행되는 것.
! 여기서 실제 이벤트가 발생한 대상(e.target)은 item으로 잡혀있기 때문에 item이 아니면 걸러지게 되고, 저 부분이 동작.
(
    이는, if (!targetElem.classList.contains('item')) return;을 주석처리한 후, 
    padding 부분을 누를 시 알 수 있다. wrapper에 open이 toggle됨.
)

*/ 

/*
* 다른 곳을 클릭하면 사라지는 팝오버 기능 구현.
! 여기서 문제가 발생. wrapper에서 이벤트가 실행되고나서, body에서 또 실행이 된다.
! body가 더 상위의 개념이기 때문에.
! 따라서 wrapper에서 stopPropagation(확산 방지)를 실행해줘야 한다.
*/ 

// document.body.addEventListener('click', function(e) {
//     if (e.target.classList.contains('context')) return; // context 클릭 시 취소
//     items.forEach(function(elem) {
//         elem.classList.remove('open');
//     })
// })

/*
    event는 최대한 줄이는 게 좋다. 따라서 1개로 구현해보자.
*/ 

document.body.addEventListener('click', function(e) {
    const targetClassList = e.target.classList;
    if (targetClassList.contains('context')) return; // context 클릭 시 취소
    if (targetClassList.contains('item')) {
        // item 클래스가 포함되어 있다면 open toggle.
        targetClassList.toggle('open');
        items.forEach(function(elem) {
            // 해당 타겟과 현재 for문에서의 elem이 다르면 open을 다시 취소.
            if (elem !== e.target) elem.classList.remove('open');
        });
        return;
    }
    // items 클래스가 포함되어 있지 않은 body Element를 누를 시, 
    // item 클래스가 포함된 엘리먼트의 모든 open 클래스를 빼줌.
    items.forEach(function(elem) {
        elem.classList.remove('open');
    })
})


/**
* ! 장점 : eventListener 한 곳에서 다 관리.
* ! 단점 : 1. 조건문이 많아짐 2. 한 곳에서만 관리하기 때문에 세부적인 관리 어려움.
*/ 