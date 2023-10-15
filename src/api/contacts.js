import Base from './Base.js';

export default class ClientsAPI extends Base {
    setBaseInfo(data, type = "formData") {
        return this.apiClient.post('profile/basic/', data, type);
    }
    setAddResume(data, type = "formData") {
        return this.apiClient.post('cv/add', data, type);
    }
    getBasic(idCv) {
        return this.apiClient.get(`cv/${idCv}/basic/get`);
    }
    updateContact(idCv, data, type = "formData") {
        return this.apiClient.post(`cv/update/${idCv}`, data, type);
    }
    updateDrawinServer(idCv, data, type = "formData") {
        return this.apiClient.post(`cv/${idCv}/switch_dummy_text/`, data, type);
    }
}
