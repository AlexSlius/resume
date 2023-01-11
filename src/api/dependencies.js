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
}
