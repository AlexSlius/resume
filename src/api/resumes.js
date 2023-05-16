import Base from './Base.js';

export default class ClientsAPI extends Base {
    getResumesAll() {
        return this.apiClient.get('api/user/resume_list');
    }
    postUpdateResumaName(id, data, type = "formData") {
        return this.apiClient.post(`cv/update/name/${id}`, data, type);
    }
    postShare(id, data, type = "formData") {
        return this.apiClient.post(`cv/${id}/share/`, data, type);
    }
    deleteResume(id) {
        return this.apiClient.delete(`cv/${id}/remove/`);
    }
}