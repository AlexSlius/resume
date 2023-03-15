import Base from './Base.js';

export default class ClientsAPI extends Base {
    getSkillslistWork(params) {
        return this.apiClient.get('profile/list/skills', params);
    }
    getSkillslistSearch(params) {
        // profile/list/skills
        return this.apiClient.get('profile/list/skills', params);
    }
    addItemSkillOne(id, data, type = "formData") {
        return this.apiClient.post(`cv/${id}/skills/add`, data, type);
    }
    updateItemSkillOne(id, data, type = "formData") {
        return this.apiClient.post(`cv/skills/update/${id}`, data, type);
    }
    deleteItemSkillOne(id) {
        return this.apiClient.delete(`cv/skills/delete/${id}`);
    }
    getSkillslistAll(id) {
        return this.apiClient.get(`cv/${id}/skills/get`);
    }
    getExperienceLevel(id) {
        return this.apiClient.get(`cv/skills/hide_experience_level/${id}/get`);
    }
    updateExperienceLevel(id, data, type = "formData") {
        return this.apiClient.post(`cv/skills/hide_experience_level/${id}`, data, type);
    }
    updatePosition(data) {
        return this.apiClient.post(`cv/skills/position/update`, data);
    }
    cleanAll(idCv) {
        return this.apiClient.delete(`cv/skills/delete_all/${idCv}`);
    }
    getSkillsPositionStartOne(params) {
        return this.apiClient.get('profile/list/skill_positions', params);
    }
}