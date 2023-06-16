import Base from './Base.js';

export default class ClientsAPI extends Base {
    login(data) {
        return this.apiClient.post('api/login_check', data);
    }
    isAuthorization(data) {
        return this.apiClient.post('api/check_token', data);
    }
    autorizeSendCodeByEmail(data, type = "formData") {
        return this.apiClient.post('autorize/send_code', data, type);
    }
    autorizeAuth(data, type = "formData") {
        return this.apiClient.post('autorize/auth', data, type);
    }
}
