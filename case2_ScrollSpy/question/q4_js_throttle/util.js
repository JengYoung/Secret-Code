/**
 * 만약 throttle 값이 지정되어 있다면 아무것도 하지 않음.
 * 
 * 
 * 
 */ 
export const throttle = (func, delay) => {
  let throttled = false;
  // do something
  return (...args) => {
    if (!throttled) {
      throttled = true;
      setTimeout(() => {
        func(...args);
        throttled = false;
      }, delay);
    }
  }
};
// event: 0.1 / 0.2 / 0.3 -> 만약 0.3초 뒤에 실행된다면 무시됨.
// 만약 0.4초가 되면 실행되고, 다시 0.5, 0.6초 때는 무시됨.

/**
 * ! 1. bind
 * */ 
export const debounce = (func, delay) => {
  let timeoutId = null;
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};


