import Base from '../Base.js';

export default class ClientsAPI extends Base {
    getCoverTemplates(params) {
        return this.apiClient.get(`list/cv/templates`, params);
    }
    // fetchGetResumeData(cvId) {
    //     return this.apiClient.get(`cv/get/${cvId}`);
    // }
    // setUpdateResumeDataActive(cvId, data, type = "formData") {
    //     return this.apiClient.post(`cv/${cvId}/update/template/`, data, type);
    // }
    // getResumeDataActive(cvId) {
    //     return this.apiClient.get(`api/cv/${cvId}/template`);
    // }
}