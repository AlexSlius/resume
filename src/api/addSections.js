import Base from './Base.js';

export default class ClientsAPI extends Base {
    getCategoryStatus(idCv) {
        return this.apiClient.get(`api/cv/category_status/${idCv}`);
    }
    updateCategoryStatus(idCv, dataUrl = {}, type = "formData") {
        return this.apiClient.post(`api/cv/category_status/update/${idCv}/${dataUrl}`, {}, type);
    }
    getCategoryViewedStatus(idCv) {
        return this.apiClient.get(`api/cv/category/viewed_status/${idCv}`);
    }
    postUpdateCategoryViewedStatus(idCv, category, type = "formData") {
        return this.apiClient.post(`api/cv/category/viewed_status/update/${idCv}/${category}/active`, {}, type);
    }
}