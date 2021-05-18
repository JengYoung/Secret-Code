import "./style.css";
import renderList from "./listRenderer";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};

const onScroll = e => {
  // do something (hint: e.target.scrollingElement)
  const { 
    scrollHeight,
    scrollTop,
    clientHeight
  } = e.target.scrollingElement;

  // 확인해보니, scrollTop과 clientHeight의 값이 소수점으로 나옴; 따라서 같을 확률이 희박할 때가 존재. 따라서 더 크게 설정해줌. (대략적으로 scrollHeight의 경우 '버림'으로 계산하는 듯.)
  if (scrollTop + clientHeight >= scrollHeight) {
    fetchMore();
  }
};


// 연속으로 발생하는 이벤트에 대해서... 
// throttle: 일정시간 간격으로 한 번씩만 실행
// debounce: 마지막 한 번만 실행.
document.addEventListener("scroll", onScroll);
fetchMore();
