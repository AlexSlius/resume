import Base from './Base.js';

export default class ClientsAPI extends Base {
    setBaseInfo(data, type = "formData") {
        return this.apiClient.post('profile/basic/', data, type);
    }
}
