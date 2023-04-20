import Base from '../Base.js';

export default class ClientsAPI extends Base {
    getCoverTemplates(params) {
        return this.apiClient.get(`list/cover/templates`, params);
    }
    setUpdateCoverDataActive(cvId, data, type = "formData") {
        return this.apiClient.post(`cover_letter/${cvId}/update/template/`, data, type);
    }
    getCoverDataActive(cvId) {
        return this.apiClient.get(`api/cover_letter/${cvId}/template`);
    }

    getCoverShareTemplateActive(cvId) {
        return this.apiClient.get(`share/cover_letter/${cvId}/template`);
    }
}