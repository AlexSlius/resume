export const sectionIndexAndAll = (list) => {
    let lengAll = Object.keys(list);
    let colNull = 0;

    Object.keys(list).map(key => {
        if (list[key].status === null) {
            colNull += 1;
        }
    });

    let index = (lengAll.length - colNull) + 1;

    return { index, lengAll, colNull };
}