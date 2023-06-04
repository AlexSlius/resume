import config from "../config/config.json";

export const downloadA = (linhref) => {
    const link = document.createElement('a');
    link.href = `${config.API_URL}/${linhref}`;
    link.setAttribute(
        'download',
        `FileName.pdf`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
}