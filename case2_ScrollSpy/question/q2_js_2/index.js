import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
/** 
 * 현재 문제: 화면 크기가 조정될 때, 제대로 된 offsetTop을 가져오지 않음.
 * 이는 초기 렌더링될 때 딱 한 번만 offsetTop을 계산하기 때문.
 * ! 해답: 함수로 바꿔준다!
*/
const getOffsetTops = (() => {
  /**
   * 그러나 바람직하냐는 것을 따졌을 때, 과연 그럴지는 의문.
   * 스크롤 이벤트는 실제로 굉장히 많이 발생.
   * 따라서 최적화를 위해, 클로저를 이용!
   * 
   * ! 이정도도 괜찮기는 하지만, 그래도 좀 더 나은 방법은, 리사이즈만 따로 이벤트처리하는 것이 더 좋을 듯하다. (함수를 계속해서 만드는 꼴이므로.)
  */
  let ofst = 0;
  let res = [];
  return () => {
    if (window.innerHeight === ofst) {
      console.log(res);
      return res;
    }
    // 아닐 경우에만 리사이즈된 값 계산.
    ofst = window.innerHeight;
    res = contentItems.map(elem => {
      const [ ofs, clh ] = [elem.offsetTop, elem.clientHeight];
      return [ofs - clh / 2, ofs + clh / 2]; 
    });
    return res;
  }
})(); // do something

window.addEventListener("scroll", e => {
  const { scrollTop } = e.target.scrollingElement;
  const targetIndex = getOffsetTops().findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ))

  Array.from(navElem.children).forEach((cb, i) => {
    if (i !== targetIndex) cb.classList.remove('on');
    else cb.classList.add('on');
  })
  // fix here
});

navElem.addEventListener("click", e => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
});
