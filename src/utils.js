const MS_DAY = 1000*60*60*24;

// start: string
// end: string
// returns int
export function diffDate(start, end){
  return Math.round((new Date(end) - new Date(start))/MS_DAY);
}

// start: string
// days: int
// return string
export function addDaysToDate(date, days){
  return new Date((new Date(date).valueOf() + days*MS_DAY)).toISOString().substr(0,10);
}

export function debounce(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}
