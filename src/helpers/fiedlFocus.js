export const focusFiedlInput = (ref, value) => {
    if (ref?.current && (value?.length == 0 || value === null || value === undefined)) {
        let el = ref.current.querySelector("input");
        el.focus();
    }
}