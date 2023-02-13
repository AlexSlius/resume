import Base from './Base.js';

export default class ClientsAPI extends Base {
    addItemHobie(idCv, data, type = "formData") {
        return this.apiClient.post(`cv/${idCv}/hobbies`, data, type);
    }
    getAllHobies(idCv) {
        return this.apiClient.get(`cv/${idCv}/hobbies/get`);
    }
    deleteItemHobie(id) {
        return this.apiClient.delete(`cv/hobbies/delete/${id}`);
    }
    updatePosition(data) {
        return this.apiClient.post(`cv/hobbies/position/update`, data);
    }
    cleanAll(idCv) {
        return this.apiClient.delete(`cv/hobbies/delete_all/${idCv}`);
    }
}