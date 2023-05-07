import Base from './Base.js';

export default class ClientsAPI extends Base {
    getUniversity(params) {
        return this.apiClient.get('profile/college_or_university_name', params);
    }
    getDegree(params) {
        return this.apiClient.get('profile/list/degree_program', params);
    }
    getDescribes(params) {
        return this.apiClient.get('api/describes/list', params);
    }
    // skills
    getSkillsStartOneJobTitle(params) {
        return this.apiClient.get('profile/list/skill_positions', params);
    }
    getSkillslistSearchRandom(params) {
        return this.apiClient.get('profile/list/skills', params);
    }
    getFieldOfStudy(params) {
        return this.apiClient.get(`profile/list/field_of_study`, params);
    }
    getCountrys() {
        return this.apiClient.get('profile/list/countrys');
    }
    getCities(id, params) {
        return this.apiClient.get(`profile/list/${id}/citys`, params);
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
    addJopsTitle(data, type = "formData") {
        return this.apiClient.post(`cv/job_title/add`, data, type);
    }
    getCompanys(params) {
        return this.apiClient.get(`profile/list/company`, params);
    }
    addCompany(data, type = "formData") {
        return this.apiClient.post(`cv/company/add`, data, type);
    }
    getEmploymentList(params) {
        return this.apiClient.get(`profile/list/employer`, params);
    }
    getStudysList(params) {
        return this.apiClient.get(`profile/list/field_of_study`, params);
    }
    getSkillsList(params) {
        return this.apiClient.get('profile/list/skills_by_name', params);
        // return this.apiClient.get('profile/list/skills', params);
    }
    getSocials(params) {
        return this.apiClient.get(`profile/list/links`, params);
    }
    getHobies(params) {
        return this.apiClient.get(`profile/list/hobbies`, params);
    }
    getListObjective(params) {
        return this.apiClient.get(`api/career_objective`, params);
    }
    getListObjectiveById(id) {
        return this.apiClient.get(`api/recomendation/career_objective/${id}`);
    }
    getLanguages(params) {
        return this.apiClient.get(`profile/list/languages`, params);
    }
    getCertificates(params) {
        return this.apiClient.get(`profile/list/certificates`, params);
    }
    getUniversityByName(params) {
        return this.apiClient.get(`college_or_university_name`, params);
    }
}
