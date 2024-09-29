import { useEffect } from 'react';

function useLimitInput(ref, maxLenth, value) {
    useEffect(() => {
        const input = ref.current;

        const handleKeydown = (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
            }
            if (value.trim().length >= maxLenth) {
                if (e.key === 'Backspace' || e.key === 'Delete') {
                    return;
                }
                e.preventDefault();
            }
        };

        if (input) {
            input.addEventListener('keydown', handleKeydown);
        }

        return () => {
            if (input) {
                input.removeEventListener('keydown', handleKeydown);
            }
        };
    }, [value, ref]);
}

export default useLimitInput;
