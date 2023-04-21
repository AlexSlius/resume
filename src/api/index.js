import ApiClient from "./ApiClient";
import dependenciesAPI from "./dependencies";
import authApi from "./auth";
import contactApi from "./contacts";
import skillsApi from "./skills";
import socialsApi from "./socials";
import hobiesApi from "./hobies";
import educationsApi from "./educations";
import employmentsApi from "./employments";
import activitysApi from "./activitys";
import coursesApi from "./courses";
import intershipsApi from "./internships";
import languagesApi from "./languages";
import certificatiesApi from "./certificaties";
import referencesApi from './references';
import resumesApi from './resumes';
import userApi from './users';
import addSectionApi from "./addSections";
import careersApi from "./careers";
import resumesDataApi from "./resumeData";
import personalizeApi from "./cover/personalize";
import coversApi from "./cover/covers";
import coverDataApi from "./cover/coverData";
import pagesApi from "./pages";

export default function apiConstruct({
  apiUrl,
  onError,
}) {
  if (!apiUrl) {
    throw new Error("[apiUrl] required");
  }

  const apiClient = new ApiClient({
    apiUrl,
    onError,
  });

  return {
    apiClient,
    dependencies: new dependenciesAPI({ apiClient }),
    auth: new authApi({ apiClient }),
    contact: new contactApi({ apiClient }),
    skills: new skillsApi({ apiClient }),
    social: new socialsApi({ apiClient }),
    hobies: new hobiesApi({ apiClient }),
    educations: new educationsApi({ apiClient }),
    employments: new employmentsApi({ apiClient }),
    activitys: new activitysApi({ apiClient }),
    courses: new coursesApi({ apiClient }),
    internships: new intershipsApi({ apiClient }),
    languages: new languagesApi({ apiClient }),
    certificates: new certificatiesApi({ apiClient }),
    references: new referencesApi({ apiClient }),
    resumes: new resumesApi({ apiClient }),
    users: new userApi({ apiClient }),
    addSection: new addSectionApi({ apiClient }),
    careers: new careersApi({ apiClient }),
    resumesData: new resumesDataApi({ apiClient }),
    personalize: new personalizeApi({ apiClient }),
    covers: new coversApi({ apiClient }),
    coverData: new coverDataApi({ apiClient }),
    pages: new pagesApi({ apiClient })
  };
}
