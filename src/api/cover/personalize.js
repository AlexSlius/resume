import Base from '../Base.js';

export default class ClientsAPI extends Base {
    createNewCoverBasic(data, type = "formData") {
        return this.apiClient.post(`profile/cover_letter_basic/`, data, type);
    }
    addCover(data, type = "formData") {
        return this.apiClient.post(`cover_letter/add`, data, type);
    }
    getCoverLetterById(id) {
        return this.apiClient.get(`cover_letter/get/${id}/`);
    }
    updateCoverLetterById(id, data, type = "formData") {
        return this.apiClient.post(`cover_letter/update/${id}`, data, type);
    }
    getCoverDataShare(cvId, key) {
        return this.apiClient.get(`share/cover/${cvId}/${key}`);
    }
    getCoverTextNoAuthNew(data, type = "formData") {
        return this.apiClient.post('open/cover/', data, type);
    }
}