import ApiClient from "./ApiClient";
import dependenciesAPI from "./dependencies";
import authApi from "./auth";

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
    dependencies: new dependenciesAPI({ apiClient }),
    auth: new authApi({ apiClient }),
  };
}
