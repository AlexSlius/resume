import Base from './Base.js';

export default class ClientsAPI extends Base {
    getResumeData(id) {
        return this.apiClient.get(`cv/get/${id}`);
    }
}