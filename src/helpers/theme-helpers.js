import { updateResolution } from "../slices/theme";

export const setAliasScreenResolution = (
  currentResolution = null,
  store
) => {
  if (typeof window !== "undefined") {
    const { innerWidth } = window;

    if (innerWidth < 576 && currentResolution != "xs") {
      store.dispatch(updateResolution("xs"));
    }

    if (innerWidth >= 576 && innerWidth < 768 && currentResolution != "sm") {
      store.dispatch(updateResolution("sm"));
    }

    if (innerWidth >= 768 && innerWidth < 992 && currentResolution != "md") {
      store.dispatch(updateResolution("md"));
    }

    if (innerWidth >= 992 && innerWidth < 1200 && currentResolution != "lg") {
      store.dispatch(updateResolution("lg"));
    }

    if (innerWidth >= 1200 && innerWidth < 1920 && currentResolution != "xl") {
      store.dispatch(updateResolution("xl"));
    }

    if (innerWidth >= 1920 && currentResolution != "full-hd") {
      store.dispatch(updateResolution("full-hd"));
    }
  }
};
