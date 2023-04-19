import Base from '../Base.js';

export default class ClientsAPI extends Base {
    getCoversAll() {
        return this.apiClient.get('api/user/cover_letters_list');
    }
    fetchPostUpdateCover(id, data, type = "formData") {
        return this.apiClient.post(`cover_letter/update/name/${id}`, data, type);
    }
    postShare(id, data, type = "formData") {
        return this.apiClient.post(`cv/${id}/share/`, data, type);
    }
}