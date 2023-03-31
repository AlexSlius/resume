import Base from '../Base.js';

export default class ClientsAPI extends Base {
    getCoversAll() {
        return this.apiClient.get('api/user/cover_letters_list');
    }
    // postUpdateResumaName(id, data, type = "formData") {
    //     return this.apiClient.post(`cv/update/name/${id}`, data, type);
    // }
}