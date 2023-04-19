import Base from './Base.js';

export default class ClientsAPI extends Base {
    getResumesTemplates(params) {
        return this.apiClient.get(`list/cv/templates`, params);
    }
    fetchGetResumeData(cvId) {
        return this.apiClient.get(`cv/get/${cvId}`);
    }
    setUpdateResumeDataActive(cvId, data, type = "formData") {
        return this.apiClient.post(`cv/${cvId}/update/template/`, data, type);
    }
    getResumeDataActive(cvId) {
        return this.apiClient.get(`api/cv/${cvId}/template`);
    }
    getResumeShareTemplateActive(cvId) {
        return this.apiClient.get(`share/${cvId}/template`);
    }
    getResumeDataShare(cvId, key) {
        return this.apiClient.get(`share/cv/${cvId}/${key}`);
    }
}