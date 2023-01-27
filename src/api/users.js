import Base from './Base.js';

export default class ClientsAPI extends Base {
    getUserAvatar() {
        return this.apiClient.get(`api/user/profile_image`);
    }
}