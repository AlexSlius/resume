import Base from './Base.js';

export default class ClientsAPI extends Base {
    // home
    ApiFetchGetUsersCreatedHome() {
        return this.apiClient.get(`home/user_photos`);
    }
    ApifetchGetUsersCreatedCoverLetter() {
        return this.apiClient.get(`home/cover/user_photos`);
    }
}

