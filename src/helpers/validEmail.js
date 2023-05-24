export const validEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
}