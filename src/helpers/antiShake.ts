let timer: number | null = null;
export default function antiShake(fn: Function, time = 300) {
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    fn();
  }, time);
}