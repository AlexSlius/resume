import fetch from "isomorphic-unfetch";
import config from "../config/config.json";

export const downloadA = async (linhref, isResume = true, setStatesetStateLoadDown = () => { }) => {
    let res = await fetch(`${config.API_URL}/${linhref}`);

    if (res.status == 200) {
        const blob = await res.blob();
        const fownloadurl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.setAttribute('download', isResume ? "resume.pdf" : 'cover.pdf');
        link.href = fownloadurl;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        setStatesetStateLoadDown(false);
    }

    if (res.status != 200)
        setStatesetStateLoadDown(false);
}