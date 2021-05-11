// Write Javascript code here!

// import "./style.css";


// 성능저하 - 이벤트 감지가 30개 있기 때문에.
// 목록이 끊임없이 변화할 때. (아이템 하나를 더 추가할 경우, 추가할 때마다 addEventListener 등록을 해줘야 함.)
const items = document.querySelectorAll('.item');

items.forEach(function(item) {
    item.addEventListener('click', function(e) {
        console.log(item);
        item.classList.toggle('open');
        items.forEach(function(elem) {
            if(elem !== item) elem.classList.remove('open');
        })
    })
});
