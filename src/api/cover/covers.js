import Base from '../Base.js';

export default class ClientsAPI extends Base {
    getCoversAll() {
        return this.apiClient.get('api/user/cover_letters_list');
    }
    fetchPostUpdateCover(id, data, type = "formData") {
        return this.apiClient.post(`cover_letter/update/name/${id}`, data, type);
    }
    postShare(id, data, type = "formData") {
        return this.apiClient.post(`cover/${id}/share/`, data, type);
    }
    deleteCover(id) {
        return this.apiClient.delete(`cover_letter/${id}/remove/`);
    }
    lastPosition(id, data, type = "formData") {
        return this.apiClient.post(`cover_letter/${id}/last_position`, data, type);
    }
    screenCover(id, key) {
        return this.apiClient.get(`share/cover_screen/${id}/${key}`);
    }
}