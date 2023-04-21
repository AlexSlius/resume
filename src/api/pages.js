import Base from './Base.js';

export default class ClientsAPI extends Base {
    // home
    ApiFetchGetUsersCreatedHome() {
        return this.apiClient.get(`home/user_photos`);
    }
}

