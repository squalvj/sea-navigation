type DebounceOptions = {
  leading?: boolean;
};

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: DebounceOptions = {}
): ((...args: Parameters<T>) => void) => {
  let timerId: NodeJS.Timeout | null;

  return (...args: Parameters<T>): void => {
    if (!timerId && options.leading) {
      func(...args);
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func(...args);
      timerId = null;
    }, delay);
  };
};

export default debounce;
