import Base from './Base.js';

export default class ClientsAPI extends Base {
    getUserAvatar() {
        return this.apiClient.get(`api/user/profile_image`);
    }
    deleteUserProgile() {
        return this.apiClient.delete(`api/user/delete`);
    }
    updateUserProgile(data, type = "formData") {
        return this.apiClient.post(`api/user/update`, data, type);
    }
    getUserProgile() {
        return this.apiClient.get(`api/user/get`,);
    }
}