export const copyToClipboard = (text, handleSuccessful = () => { }) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            handleSuccessful();
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });
}