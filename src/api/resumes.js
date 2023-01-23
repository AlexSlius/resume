import Base from './Base.js';

export default class ClientsAPI extends Base {
    getResumesAll() {
        return this.apiClient.get('api/user/resume_list');
    }
}