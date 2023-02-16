import Base from './Base.js';

export default class ClientsAPI extends Base {
    cleanAll(idCv) {
        return this.apiClient.delete(`cv/career_objective/delete_all/${idCv}`);
    }
    getCvCarreers(idCv) {
        return this.apiClient.get(`cv/${idCv}/career_objective/get`);
    }
    create(idCv, data, type = "formData") {
        return this.apiClient.post(`cv/${idCv}/career_objective/add`, data, type);
    }
    update(idCv, data, type = "formData") {
        return this.apiClient.post(`cv/${idCv}/career_objective/update`, data, type);
    }
}