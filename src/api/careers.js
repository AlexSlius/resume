import Base from './Base.js';

export default class ClientsAPI extends Base {
    cleanAll(idCv) {
        return this.apiClient.delete(`cv/career_objective/delete_all/${idCv}`);
    }
    getCvCarreers(idCv) {
        return this.apiClient.get(`cv/${idCv}/career_objective/get`);
    }
    update(idCv, data, type = "formData") {
        return this.apiClient.patch(`cv/${idCv}/career_objective/add`, data, type);
    }
}