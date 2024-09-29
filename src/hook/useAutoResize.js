import { useRef, useEffect } from 'react';

function useAutoResize(value, params) {
    const ref = useRef();

    useEffect(() => {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, [value, params]);

    return ref;
}

export default useAutoResize;
