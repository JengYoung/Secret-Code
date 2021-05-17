import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);
const offsetTops = contentItems.map((elem, index) => {
  const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
  console.log("index, ofs, clh: ", index, ofs, clh)
  return [ofs - clh / 2, ofs + clh / 2];
});

/**
 * ! 1. e.target.scrollingElement: scrollingElement속성은 HTML body요소가 있고 스크롤 가능할 수있는 경우 HTML 요소를 반환
 * 
 * ! 2. Array.  findIndex: 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 만족하는 요소가 없으면 -1을 반환합니다.
 * Syntax) arr.findIndex(callback(element[, index[, array]])[, thisArg])
 * 콜백함수는 크게 1. element, 2. index, 3. array의 3가지 매개변수를 받음.
 *
 * 예시) 
 * const array1 = [5, 12, 8, 130, 44];
 * const isLargeNumber = (element) => element > 13;
 * console.log(array1.findIndex(isLargeNumber));
 * 
 * ! 3. element.children: 엘리먼트의 하위 속성들을 가져옴.
 * 주의) To get all child nodes, including non-element nodes like text and comment nodes, use Node.childNodes.
 * 
 * ! 4. Array.from() : Array.from() 메서드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운 Array 객체를 만듭니다.
 * 예시) Array.from(arrayLike[, mapFn[, thisArg]])
 * 
 * ! 5. tagName: tagName 읽기 전용 속성은 요소에 호출된 태그 명을 가져온다.
 * 주의)  HTML 문서에서는, 원본 문서에 정의된 태그명과 달리 대소문자를 무시하면서 대문자로만 이루어진 "태그" 값을 가져오게 된다.
 * 
 * ! 6. scrollIntoView: Element 인터페이스의 scrollIntoView() 메소드는 scrollIntoView()가 호출 된 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤합니다.
 * Boolean type param) alignToTop 
 * Object type param) scrollIntoViewOptions = { 
 *                                               block: : 수직 정렬 ("start",  "center",  "end",  "nearest"), 
 *                                               behavior: 전환 애니메이션 (auto, smooth) , 
 *                                               inline: 수평 정렬 ("start",  "center",  "end",  "nearest")
 *                                            }
 */

window.addEventListener("scroll", (e) => {
  const { scrollTop } = e.target.scrollingElement;
  // do something
  const targetIndex = offsetTops.findIndex(([from, to]) => (
    scrollTop >= from && scrollTop < to
  ));
  Array.from(navElem.children).forEach((c, i) => {
    if (i !== targetIndex) c.classList.remove('on');
    else c.classList.add('on');
  })
});

// 이동
navElem.addEventListener("click", (e) => {
  const targetElem = e.target;
  if (targetElem.tagName === "BUTTON") {
    const targetIndex = navItems.indexOf(targetElem.parentElement);
    contentItems[targetIndex].scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
});

