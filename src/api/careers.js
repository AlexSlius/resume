import Base from './Base.js';

export default class ClientsAPI extends Base {
    cleanAll(idCv) {
        return this.apiClient.delete(`cv/career_objective/delete_all/${idCv}`);
    }
}