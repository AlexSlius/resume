export const levelLanguage = (level) => {
    let lev = "A1";

    switch (level) {
        case 1:
            lev = "A1";
            break;
        case 2:
            lev = "A2";
            break;
        case 3:
            lev = "B1";
            break;
        case 4:
            lev = "B2";
            break;
        case 5:
            lev = "C1";
            break;
        case 6:
            lev = "C2";
            break;
    }

    return lev;
}