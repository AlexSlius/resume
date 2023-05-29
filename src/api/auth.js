import Base from './Base.js';

export default class ClientsAPI extends Base {
    login(data) {
        return this.apiClient.post('api/login_check', data);
    }
    register(data) {
        return this.apiClient.post('api/register', data);
    }
    resetPassword(data) {
        return this.apiClient.post('api/reset_password', data);
    }
    changeCodePassword(data) {
        return this.apiClient.post('api/check_code', data);
    }
    newPassword(data) {
        return this.apiClient.post('api/change_password', data);
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
