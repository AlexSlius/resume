import Base from './Base.js';

export default class ClientsAPI extends Base {
    getListCourses(idCv) {
        return this.apiClient.get(`cv/${idCv}/courses/get`);
    }
    addCoursesItem(idCv, data, type = "formData") {
        return this.apiClient.post(`cv/${idCv}/courses/add`, data, type);
    }
    deleteCoursesItem(id) {
        return this.apiClient.delete(`cv/courses/delete/${id}`);
    }
    updateCoursesItem(id, data, type = "formData") {
        return this.apiClient.post(`cv/courses/update/${id}`, data, type);
    }
    updatePosition(data) {
        return this.apiClient.post(`cv/courses/position/update`, data);
    }
    cleanAll(idCv) {
        return this.apiClient.delete(`cv/courses/delete_all/${idCv}`);
    }
}