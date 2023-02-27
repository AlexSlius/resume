import Base from './Base.js';

export default class ClientsAPI extends Base {
    getResumesTemplates() {
        return this.apiClient.get(`list/cv/templates`);
    }
    fetchGetResumeData(cvId) {
        return this.apiClient.get(`cv/get/${cvId}`);
    }
}