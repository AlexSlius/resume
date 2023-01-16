import ApiClient from "./ApiClient";
import dependenciesAPI from "./dependencies";
import authApi from "./auth";
import contactApi from "./contacts";
import skillsApi from "./skills";
import socialsApi from "./socials";

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
  };
}
