import Constants from "expo-constants";

export const getFullImageUrl = (imagePath) => {
  const baseUrl = Constants.expoConfig?.extra?.REACT_APP_API_URL.replace(
    "/api",
    ""
  );
  return `${baseUrl}/${imagePath}`;
};
