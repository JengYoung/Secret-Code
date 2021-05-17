// import $ from 'jquery';

const $wrapper = $('.wrapper');
const $items = $wrapper.find('.item');
console.log($wrapper);
// $wrapper.on('click', '.item', function(e) {
//     e.stopPropagation();
//     // J QUery는 나머지는 siblings로 잡아서, 한 번에 클래스 삭제 가능.
//     $(this).toggleClass('open').siblings().removeClass('open');
// })

// $('body').on('click', function(e) {
//     $items.removeClass('open');
// })

$('body').on('click', function(e) {
    const item = $(e.target);
    if (item.is('.item')) {
        item.toggleClass('open').siblings().removeClass('open');
    } else {
        $items.removeClass('open');
    }
});