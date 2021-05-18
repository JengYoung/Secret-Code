import "./style.css";

const navElem = document.querySelector("#nav");
const navItems = Array.from(navElem.children);
const contentsElem = document.querySelector("#contents");
const contentItems = Array.from(contentsElem.children);

/**
 * IntersectionObserver() 생성자는 새로운 IntersectionObserver 객체를 생성하고 반환합니다. rootMargin 옵션을 지정했다면 값의 구문이 맞는지, 범위가 0.0 이상 1.0 이하인지, 그리고 역치가 오름차순으로 정렬됐는지 검사합니다. 역치 목록이 없다면 배열 [0.0]을 사용합니다.
 * 
 * 
 * */ 
const scrollSpyObserver = new IntersectionObserver(
  entries => {
    // do something
    console.log(entries);
    const { target } = entries.find(entry => entry.isIntersecting);
    const index = contentItems.indexOf(target);
    Array.from(navElem.children).forEach((c, i) => {
      if (i === index) c.classList.add('on');
      else c.classList.remove('on');
    })
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.5
  }
);
contentItems.forEach(item => scrollSpyObserver.observe(item));

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
