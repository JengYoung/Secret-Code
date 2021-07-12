const carousel = ($container, images) => {
  // Write JS Code Here!

  function setAutoPlay() {
    return setInterval(() => {
      move(++currentSlide, DURATION);
    }, 3000)
  }
  // 현재 슬라이드 인덱스. 
  // (0 or images.length + 1 : 클론 슬라이드)
  let currentSlide = 0;

  // 현재 이동 여부
  let isMoving = false;

  const DURATION = 500;

  // Auto Play 기능
  let timerId = null;

  // img를 담은 컨테이너.
  let $carouselSlides = null;

  // 움직이는 역할
  const move = (currentSlide, duration = 0) => {
    // duration이 0이 아니면 transition 시작. isMoving은 transition이벤트 발생 시 false
    if (duration) isMoving = true;
    $carouselSlides.style.setProperty('--duration', duration);
    $carouselSlides.style.setProperty('--currentSlide', currentSlide);
  };

  document.addEventListener('DOMContentLoaded', () => {
    $container.innerHTML = `
      <div class="carousel-slides">
        ${[images[images.length - 1], ...images, images[0]].map(url => `<img src="${url}" />`).join('')}
      </div>
      <button class="carousel-control prev">&laquo;</button>
      <button class="carousel-control next">&raquo;</button>
    `;

    $carouselSlides = document.querySelector('.carousel-slides');
  });
  
  // 이미지는 로드된 이후, width를 가져오는 게 좋다.
  // img의 width는 가변적이므로 첫번째 요소으 width를 offsetWidth로 취득해 설정
  window.onload = () => {
    const { offsetWidth }  = $carouselSlides.querySelector('img');
    $container.style.width = `${offsetWidth}px`;
    // 초기 0번째는 마지막에 보여줄 이미지임. 따라서 시작부터 1증가시킴.
    move(++currentSlide);
    // 설정이 완료된 후에 보이도록 함.
    $container.style.opacity = 1;

    timerId = setAutoPlay();
  }

  $container.onclick = ({ target }) => {
    if (!target.classList.contains('carousel-control') || isMoving) return;

    clearInterval(timerId);
    timerId = setAutoPlay();

    const delta = target.classList.contains('prev') ? -1 : 1;
    currentSlide += 1 * delta;
    move(currentSlide, DURATION);
  };

  $container.ontransitionend = () => {
    isMoving = false;
    const delta = currentSlide === 0 ? 1 : (currentSlide === images.length + 1 ? -1 : 0);
    // 클론 슬라이드가 아니면 이동 X
    if (!delta) return;

    currentSlide += images.length * delta;
    move(currentSlide);
  }
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);