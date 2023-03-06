export const sizeLineSpacing = (stateLineSpacing) => {
    switch (stateLineSpacing) {
        case 0: {
            return "line-height-scheme-state-small";
        }
        case 50: {
            return "line-height-scheme-state-medium";
        }
        case 100: {
            return "line-height-scheme-state-big";
        }
    }
}

export const sizeFont = (stateFontSize) => {
    switch (stateFontSize) {
        case 0: {
            return "font-size-scheme-state-small";
        }
        case 50: {
            return "font-size-scheme-state-medium";
        }
        case 100: {
            return "font-size-scheme-state-big";
        }
    }
}