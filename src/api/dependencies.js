import Base from './Base.js';

export default class ClientsAPI extends Base {
    getCountrys() {
        return this.apiClient.get('profile/list/countrys');
    }
    getCities(id) {
        return this.apiClient.get(`profile/list/${id}/citys`);
    }
    getZipCodes(id) {
        return this.apiClient.get(`profile/list/${id}/zip`);
    }
    getDrivers(id) {
        return this.apiClient.get(`profile/list/${id}/driver_licenses`);
    }
    getNationality(params) {
        return this.apiClient.get(`profile/list/nationality`, params);
    }
    getJopsTitle(params) {
        return this.apiClient.get(`profile/list/jobs_title`, params);
    }
    getCompanys(params) {
        return this.apiClient.get(`profile/list/company`, params);
    }
    getEmploymentList(params) {
        return this.apiClient.get(`profile/list/employer`, params);
    }
    getStudysList(params) {
        return this.apiClient.get(`profile/list/field_of_study`, params);
    }
}
