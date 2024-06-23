const debounce = (func, delay = 0) => {
    let timerId;

    return () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }

        timerId = setTimeout(() => {
            func();
        }, delay);
    };
};

export default debounce;
