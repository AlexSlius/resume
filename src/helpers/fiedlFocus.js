export const focusFiedlInput = (ref, value) => {
    if (ref?.current && (value?.length == 0 || value === null || value === undefined)) {
        let el = ref.current.querySelector("input");
        el.focus();
    }
}

export const focusFieldInputClassName = (className = '') => {
    if (!className?.length > 0)
        return;

    if (className.includes('draf')) {
        let el = document.querySelector(`.${className} .DraftEditor-root`);

        if (!el)
            return;

        el.click()
    }

    if (className.includes('area')) {
        let el = document.querySelector(`.${className} textarea`);

        if (!el)
            return;

        let value = el?.value;

        if ((value?.length == 0 || value === null || value === undefined)) {
            el.focus()
        }
    }

    if (className.includes('data')) {
        let elWr = document.querySelector(`.${className} .wr-input`);
        let el = document.querySelector(`.${className} input`);

        if (!elWr)
            return;

        let value = el?.value;

        if ((value?.length == 0 || value === null || value === undefined)) {
            elWr.click();
        }
    }

    let el = document.querySelector(`.${className} input`);

    if (!el)
        return;

    let value = el?.value;

    if ((value?.length == 0 || value === null || value === undefined)) {
        el.focus()
    }
}