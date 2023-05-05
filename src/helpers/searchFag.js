export const searchFag = (text = '', arr = []) => {
    if (!!text.length) {
        let listOut = [];

        for (let i = 0; i < arr.length; i++) {
            let keys = Object.keys(arr[i]);

            for (let p = 0; p < keys.length; p++) {
                let isEnters = (`${arr[i][keys[p]]}`).toLowerCase().includes(text.toLowerCase());

                if (isEnters) {
                    listOut.push(arr[i]);
                    break;
                }
            }
        }

        return listOut;
    }

    return arr.slice(1, 6);
}