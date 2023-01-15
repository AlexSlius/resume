import Base from './Base.js';

export default class ClientsAPI extends Base {
    getSkillslistWork(params) {
        return this.apiClient.get('profile/list/skills', params);
    }
    getSkillslistSearch(params) {
        return this.apiClient.get('profile/list/skills_by_name', params);
    }
}