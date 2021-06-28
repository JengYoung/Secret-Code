// fetch fake data
const fetchTabsData = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: 'HTML',
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
          },
          {
            title: 'CSS',
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`
          },
          {
            title: 'JavaScript',
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`
          }
        ]),
      1000
    );
  });
};

// Do something!

document.addEventListener('DOMContentLoaded', async () => {
  let currentTabIndex = 0;
  try {
    // Promise를 리턴하게 될 것.
    const tabsData = await fetchTabsData();
    console.log(tabsData)

    // 데이터 제대로 도착하면 스피너 제거
    const $tabs = document.querySelector('.tabs');
    const $spinner = document.querySelector('.spinner');
    
    $spinner.style.display = 'none';
    $tabs.style.setProperty('--tabs-length', tabsData.length);

    /* 
      createElement로도 가능하겠지만, tab 메뉴는 초기에 한 번 데이터 받아서 변경 X하므로 
      innerHTML 사용.
    */
    const nav = tabsData.map(({ title }, i) => `
      ${(i === 0 ? `<nav>` : '')}
        <div class="tab" data-index=${i}>${ title }</div>
      ${ i === tabsData.length - 1 ? `<span class="glider"></span></nav>` : ''}
    `)
    console.log(nav);

    const contents = tabsData.map(({ content }, i) => `<div class="tab-content ${i === currentTabIndex ?  'active': ""}">${content}</div>`);

    $tabs.innerHTML = [...nav, ...contents].join('')

    /**
     * 주의! 현재 스코프 외에 전역 스코프에 이벤트리스너를 단다면, 데이터가 현재 비동기로 fetch되는 상황에서 제대로 동작하지 않을 수 있다.
     * 따라서 이벤트리스너를 현재 비동기 함수 안에서 실행.
     */
  } catch(e) {
    console.error(e)
  };

  /**
   *  계속해서 querySelector가 비효율적으로 중복해서 선언 및 할당됨.
   *  따라서 클로저로 해결!
   */
  // document.querySelector('nav').onclick = e => {
  //   const $glider = document.querySelector('.glider');
  //   const $tabContents = document.querySelectorAll('.tab-content');

  //   currentTabIndex = +e.target.dataset.index; // 강제 타입 변환.
  //   $glider.style.transform = `translate3D(${currentTabIndex * 100}%, 0, 0)`;

  //   $tabContents.forEach(($tabContent, i) => {
  //     $tabContent.classList.toggle('active', currentTabIndex === i);
  //   });
  // }
  document.querySelector('nav').onclick = (() => {
    const $glider = document.querySelector('.glider');
    const $tabContents = document.querySelectorAll('.tab-content');
  
    return e => {
      currentTabIndex = +e.target.dataset.index; // 강제 타입 변환.
      $glider.style.transform = `translate3D(${currentTabIndex * 100}%, 0, 0)`;
  
      $tabContents.forEach(($tabContent, i) => {
        $tabContent.classList.toggle('active', currentTabIndex === i);
      });
    }
  })();
})